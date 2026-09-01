import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  computed,
  effect,
  inject,
  signal,
  Injector,
  ChangeDetectionStrategy,
  input,
  viewChild,
} from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import type {
  IBuilderComponent,
  IBuilderComponentElement,
  IBuilderConfig,
  IUiux,
  IWidgetPicker,
} from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CONFIG, UIUX } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { cloneDeep } from 'lodash-es';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import { WebformPickerService } from './webform/webform-picker.service';
import type { IWebformSummary, IWebformWarning } from './webform/webform.interface';

interface ISearchHit {
  item: IBuilderComponentElement;
  group: IBuilderComponent;
}

/** Id of the synthetic group that lists the CMS webforms */
const WEBFORM_GROUP_ID = 'webform';

/**
 * `unavailable` is the deployment that never enabled the list endpoint, which is
 * a supported setup and not an error to report.
 */
type WebformState = 'loading' | 'ready' | 'error' | 'unavailable';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-widget-picker',
  templateUrl: './widget-picker.component.html',
  styleUrls: ['./widget-picker.component.scss'],
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS],
})
export class WidgetPickerComponent implements OnInit {
  readonly content = input<IWidgetPicker>();
  readonly addType = input<string>();
  readonly path = input<string>();

  readonly previewPopup = viewChild<ElementRef>('previewPopup');
  readonly pickerRoot = viewChild<ElementRef>('picker');

  private readonly VIEWPORT_RATIO = 0.85;
  /** Padding of the preview popup (12px per side), used for size calculation */
  private readonly PREVIEW_PADDING = 24;

  public bcData = signal(false);
  public selectedGroup = signal<IBuilderComponent | null>(null);
  public hoveredWidget = signal<IBuilderComponentElement | null>(null);
  public widgets = signal<IUiux>({ label: '', icon: '', type: 'base', elements: [] });
  public searchQuery = signal('');

  /** Exposed so the template can single out the webform group */
  public readonly webformGroupId = WEBFORM_GROUP_ID;
  public webformState = signal<WebformState>('loading');
  public webforms = signal<IWebformSummary[]>([]);
  /** Id of the webform whose fields are currently being fetched */
  public insertingWebform = signal<string | null>(null);

  /**
   * Webforms live in the CMS, not in the static component library, so the group is
   * built at runtime and appended after the library categories.
   */
  private webformGroup = computed<IBuilderComponent>(() => ({
    id: WEBFORM_GROUP_ID,
    label: this.translate.instant('BUILDER.WIDGET_PICKER.WEBFORM_GROUP'),
    icon: 'form-select',
    child: this.webforms().map(webform => ({
      id: `${WEBFORM_GROUP_ID}:${webform.id}`,
      type: WEBFORM_GROUP_ID,
      label: webform.title,
      mark: webform.description || webform.id,
      icon: 'form-select',
    })),
  }));

  public widgetGroups = computed<IBuilderComponent[]>(() => {
    const elements = this.widgets().elements;
    const groups = Array.isArray(elements) ? elements : [];
    // The webform endpoint is optional, so a deployment that did not enable it
    // must not get a category whose only possible content is an error
    if (this.webformState() === 'unavailable') {
      return groups;
    }
    return [...groups, this.webformGroup()];
  });

  /**
   * The webform group is rebuilt whenever the list arrives, so the snapshot kept in
   * `selectedGroup` would go stale; resolve it again while it is the open group.
   */
  public currentGroup = computed<IBuilderComponent | null>(() => {
    const selected = this.selectedGroup();
    if (selected?.id !== WEBFORM_GROUP_ID) {
      return selected;
    }
    // Opened while still loading, then found to be unavailable: fall back to the
    // category list, which no longer offers the group
    return this.webformState() === 'unavailable' ? null : this.webformGroup();
  });

  /** Aggregates all matching components across categories while searching */
  public searchResults = computed<ISearchHit[]>(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return [];
    const groups = this.widgetGroups();
    const hits: ISearchHit[] = [];
    for (const group of groups) {
      for (const item of group.child) {
        const haystack = [item.label, item.mark, group.label]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (haystack.includes(q)) hits.push({ item, group });
      }
    }
    return hits;
  });

  private uiux$ = inject(UIUX);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  private storage = inject(LocalStorageService);
  private translate = inject(TranslateService);
  private injector = inject(Injector);
  private webformPicker = inject(WebformPickerService);
  public builderConfig$ = inject(BUILDER_CONFIG);

  private widgetPopper?: PopperInstance;
  private previewResizeObserver?: ResizeObserver;
  private previewResizeFrame?: number;

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => this.destroyPreviewPopper());
    this.storage
      .observe(this.builder.COPYCOMPONENTKEY)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.bcData.set(data);
      });
    this.uiux$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(libaries => {
      if (libaries) {
        const [first] = libaries;
        this.widgets.set(first);
      }
    });
    // Loaded upfront (and cached for the session) so webforms are searchable
    // without opening their category first
    this.loadWebforms();
  }

  /** Loads the CMS webform list; the service serves it from cache after the first call. */
  loadWebforms(): void {
    this.webformState.set('loading');
    this.webformPicker
      .getWebforms()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: list => {
          this.webforms.set(list);
          this.webformState.set('ready');
        },
        error: error => {
          this.webforms.set([]);
          // A missing route or a role without the REST permission means the
          // feature is simply not available here; anything else is a real fault
          const unavailable = error?.status === 404 || error?.status === 403;
          this.webformState.set(unavailable ? 'unavailable' : 'error');
          if (!unavailable) {
            console.error('Failed to load the webform list:', error);
          }
        },
      });
  }

  selectGroup(group: IBuilderComponent): void {
    this.searchQuery.set('');
    this.selectedGroup.set(group);
  }

  goBack(): void {
    this.destroyPreviewPopper();
    this.selectedGroup.set(null);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  onHoverWidget(item: IBuilderComponentElement, anchor: HTMLElement): void {
    // Webform cards carry no renderable content, so there is nothing to preview
    if (item.type === WEBFORM_GROUP_ID) {
      return;
    }
    this.hoveredWidget.set(item);
    this.destroyPreviewPopper();
    const previewPopup = this.previewPopup();
    if (previewPopup?.nativeElement) {
      const popupEl: HTMLElement = previewPopup.nativeElement;
      const pickerEl: HTMLElement | null = this.pickerRoot()?.nativeElement ?? null;
      // Use the card as the reference (same as the original implementation, so the popup always
      // shows and Popper's internal reference rect stays correct). A custom modifier pins the
      // popup's x to the left of the picker, so hovering cards in either column keeps the popup
      // horizontally aligned while its vertical position still follows the hovered card.
      this.widgetPopper = createPopper(anchor, popupEl, {
        strategy: 'fixed',
        placement: 'left',
        modifiers: [
          { name: 'offset', options: { offset: [0, 12] } },
          { name: 'preventOverflow', options: { padding: 8 } },
          {
            name: 'pinXToPickerLeft',
            enabled: !!pickerEl,
            phase: 'main',
            requires: ['popperOffsets'],
            fn: ({ state }) => {
              if (!pickerEl || !state.modifiersData.popperOffsets) return;
              const pickerLeft = pickerEl.getBoundingClientRect().left;
              const popperWidth = state.rects.popper.width;
              state.modifiersData.popperOffsets.x = pickerLeft - popperWidth - 12;
            },
          },
        ],
      });
      this.widgetPopper.update();
      if (typeof ResizeObserver !== 'undefined') {
        this.previewResizeObserver = new ResizeObserver(() => {
          this.schedulePreviewScale();
        });
        const canvas = popupEl.querySelector('.preview-canvas') as HTMLElement | null;
        if (canvas) {
          this.previewResizeObserver.observe(canvas);
        }
        this.previewResizeObserver.observe(popupEl);
      }
      this.applyPreviewScale();
    }
  }

  onLeaveWidget(): void {
    this.hoveredWidget.set(null);
    this.destroyPreviewPopper();
  }

  private destroyPreviewPopper(): void {
    if (this.previewResizeFrame !== undefined) {
      cancelAnimationFrame(this.previewResizeFrame);
      this.previewResizeFrame = undefined;
    }
    this.previewResizeObserver?.disconnect();
    this.previewResizeObserver = undefined;
    this.widgetPopper?.destroy();
    this.widgetPopper = undefined;
    const previewPopup = this.previewPopup();
    if (previewPopup?.nativeElement) {
      const popupEl: HTMLElement = previewPopup.nativeElement;
      popupEl.style.width = '';
      popupEl.style.height = '';
      popupEl.style.maxWidth = '';
      popupEl.style.maxHeight = '';
      const canvas = popupEl.querySelector('.preview-canvas') as HTMLElement | null;
      if (canvas) {
        canvas.style.width = '';
        canvas.style.height = '';
        canvas.style.transform = '';
      }
    }
  }

  private schedulePreviewScale(): void {
    if (this.previewResizeFrame !== undefined) {
      return;
    }
    this.previewResizeFrame = requestAnimationFrame(() => {
      this.previewResizeFrame = undefined;
      this.applyPreviewScale();
    });
  }

  private applyPreviewScale(): void {
    const previewPopup = this.previewPopup();
    if (!previewPopup?.nativeElement) {
      return;
    }
    const popupEl: HTMLElement = previewPopup.nativeElement;
    const canvas = popupEl.querySelector('.preview-canvas') as HTMLElement | null;
    // Popup uses box-sizing: border-box, so padding eats into the size; subtract it for usable space
    const maxW = window.innerWidth * this.VIEWPORT_RATIO - this.PREVIEW_PADDING;
    const maxH = window.innerHeight * this.VIEWPORT_RATIO - this.PREVIEW_PADDING;

    if (canvas) {
      // Render at the desktop design width first, then scale uniformly to the viewport, avoiding jitter
      const naturalWidth = Math.max(canvas.scrollWidth, canvas.offsetWidth, 1);
      const naturalHeight = Math.max(canvas.scrollHeight, canvas.offsetHeight, 1);
      const scale = Math.min(maxW / naturalWidth, maxH / naturalHeight, 1);
      const contentW = scale < 1 ? naturalWidth * scale : naturalWidth;
      const contentH = scale < 1 ? naturalHeight * scale : naturalHeight;
      canvas.style.transform = scale < 1 ? `scale(${scale})` : '';
      // Popup total size = content size + padding; min-width / min-height are CSS fallbacks
      popupEl.style.width = `${contentW + this.PREVIEW_PADDING}px`;
      popupEl.style.height = `${contentH + this.PREVIEW_PADDING}px`;
    } else {
      popupEl.style.width = '';
      popupEl.style.height = '';
      popupEl.style.maxWidth = `${maxW + this.PREVIEW_PADDING}px`;
      popupEl.style.maxHeight = `${maxH + this.PREVIEW_PADDING}px`;
    }
    this.widgetPopper?.update();
  }

  onPasteData(): void {
    this.onSelect(this.bcData());
    this.storage.clear(this.builder.COPYCOMPONENTKEY);
  }

  /**
   * Single entry point for both the category list and the search results:
   * library widgets carry their content inline, webforms have to be fetched first.
   */
  onPick(item: IBuilderComponentElement): void {
    if (item.type === WEBFORM_GROUP_ID) {
      this.onSelectWebform(item);
      return;
    }
    this.onSelect(item.content);
  }

  /** Fetches the selected webform's fields and inserts it as a `dynamic-form` node. */
  onSelectWebform(item: IBuilderComponentElement): void {
    if (this.insertingWebform()) {
      return;
    }
    const webform = this.webforms().find(entry => `${WEBFORM_GROUP_ID}:${entry.id}` === item.id);
    if (!webform) {
      return;
    }
    if (!this.content()) {
      this.util.openSnackbar(
        this.translate.instant('BUILDER.WIDGET_PICKER.SELECT_POSITION_FIRST'),
        'ok'
      );
      return;
    }
    this.insertingWebform.set(webform.id);
    this.webformPicker
      .buildDynamicForm(webform, this.translate.instant('BUILDER.WIDGET_PICKER.WEBFORM_SUBMIT'))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ content, warnings }) => {
          this.insertingWebform.set(null);
          this.warnAboutLossyFields(warnings);
          this.onSelect(content);
        },
        error: error => {
          this.insertingWebform.set(null);
          this.util.openSnackbar(
            this.translate.instant('BUILDER.WIDGET_PICKER.WEBFORM_INSERT_FAILED'),
            'ok'
          );
          console.error('Failed to load the webform fields:', error);
        },
      });
  }

  /** True while this card's webform fields are being fetched */
  isInserting(item: IBuilderComponentElement): boolean {
    const inserting = this.insertingWebform();
    return !!inserting && item.id === `${WEBFORM_GROUP_ID}:${inserting}`;
  }

  /** Element types with no formly equivalent are dropped; never do that silently. */
  private warnAboutLossyFields(warnings: IWebformWarning[]): void {
    const dropped = warnings.filter(warning => warning.reason === 'unsupported');
    if (dropped.length === 0) {
      return;
    }
    this.util.openSnackbar(
      this.translate.instant('BUILDER.WIDGET_PICKER.WEBFORM_PARTIAL', {
        fields: dropped.map(warning => warning.key).join(', '),
      }),
      'ok'
    );
  }

  onSelect(widget: any): void {
    const contentValue = this.content();
    if (!contentValue) {
      this.util.openSnackbar(
        this.translate.instant('BUILDER.WIDGET_PICKER.SELECT_POSITION_FIRST'),
        'ok'
      );
      return;
    }
    const { addType, path, content } = contentValue;
    const data = cloneDeep(content);
    const widgetContent = cloneDeep(widget);

    if (addType === 'widget') {
      this.builder.updatePageContentByPath(path, widgetContent, 'add');
      this.onLeave();
      return;
    }

    if (addType === 'layout') {
      this.builder.updatePageContentByPath(
        path,
        this.copyLayoutLastChild(data.elements ?? [], widgetContent),
        'add'
      );
      this.onLeave();
      return;
    }

    const lists = [...(data.elements ?? [])];
    lists.splice(lists.length, 0, widgetContent);
    this.builder.updatePageContentByPath(`${path}.elements`, lists);
    this.onLeave();
  }

  onLeave(): void {
    this.destroyPreviewPopper();
    this.builder.closeRightDrawer$.next(true);
  }

  copyLayoutLastChild(elements: any[], widget: any): any {
    const last = Object.assign({}, elements[elements.length - 1]);
    last.elements = [cloneDeep(widget)];
    return last;
  }
}
