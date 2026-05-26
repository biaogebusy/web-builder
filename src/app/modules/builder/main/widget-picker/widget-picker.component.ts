import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  computed,
  inject,
  signal,
  ChangeDetectionStrategy,
  input,
  viewChild
} from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
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

interface ISearchHit {
  item: IBuilderComponentElement;
  group: IBuilderComponent;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-widget-picker',
  templateUrl: './widget-picker.component.html',
  styleUrls: ['./widget-picker.component.scss'],
  imports: [ShareModule, WidgetsModule],
})
export class WidgetPickerComponent implements OnInit {
  readonly content = input<IWidgetPicker>();
  readonly addType = input<string>();
  readonly path = input<string>();

  readonly previewPopup = viewChild<ElementRef>('previewPopup');
  readonly pickerRoot = viewChild<ElementRef>('picker');

  private readonly VIEWPORT_RATIO = 0.85;
  /** popup 内边距（左右/上下各 12px），用于尺寸计算 */
  private readonly PREVIEW_PADDING = 24;

  public bcData = signal(false);
  public selectedGroup = signal<IBuilderComponent | null>(null);
  public hoveredWidget = signal<IBuilderComponentElement | null>(null);
  public widgets = signal<IUiux>({ label: '', icon: '', type: 'base', elements: [] });
  public searchQuery = signal('');

  /** 搜索时跨分类聚合所有匹配的组件 */
  public searchResults = computed<ISearchHit[]>(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return [];
    const groups = (this.widgets().elements || []) as IBuilderComponent[];
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

  private uiux$ = inject<Observable<any[]>>(UIUX);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  private storage = inject(LocalStorageService);
  private translate = inject(TranslateService);
  public builderConfig$ = inject<Observable<IBuilderConfig>>(BUILDER_CONFIG);

  private widgetPopper?: PopperInstance;
  private previewResizeObserver?: ResizeObserver;

  ngOnInit(): void {
    this.storage
      .observe(this.builder.COPYCOMPONENTKEY)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.bcData.set(data);
      });
    this.uiux$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(libaries => {
      const [first] = libaries;
      this.widgets.set(first);
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
    this.hoveredWidget.set(item);
    this.destroyPreviewPopper();
    const previewPopup = this.previewPopup();
    if (previewPopup?.nativeElement) {
      const popupEl: HTMLElement = previewPopup.nativeElement;
      const pickerEl: HTMLElement | null = this.pickerRoot()?.nativeElement ?? null;
      // 用 card 作为 reference（与原实现一致，保证 popup 一定显示 + Popper 内部 reference rect 正确）。
      // 通过自定义 modifier 把 popup 的 x 坐标钉到 picker 左外侧，
      // 让左右两列卡片悬浮时 popup 横向位置一致，纵向仍跟随当前 hover 卡片。
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
          this.applyPreviewScale();
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

  private applyPreviewScale(): void {
    const previewPopup = this.previewPopup();
    if (!previewPopup?.nativeElement) {
      return;
    }
    const popupEl: HTMLElement = previewPopup.nativeElement;
    const canvas = popupEl.querySelector('.preview-canvas') as HTMLElement | null;
    // popup box-sizing: border-box，padding 占用尺寸，所以先扣除得到内容可用空间
    const maxW = window.innerWidth * this.VIEWPORT_RATIO - this.PREVIEW_PADDING;
    const maxH = window.innerHeight * this.VIEWPORT_RATIO - this.PREVIEW_PADDING;

    if (canvas) {
      // 先按桌面端设计宽度渲染，再根据视口统一缩放，避免预览随组件原生宽度抖动
      const naturalWidth = Math.max(canvas.scrollWidth, canvas.offsetWidth, 1);
      const naturalHeight = Math.max(canvas.scrollHeight, canvas.offsetHeight, 1);
      const scale = Math.min(maxW / naturalWidth, maxH / naturalHeight, 1);
      const contentW = scale < 1 ? naturalWidth * scale : naturalWidth;
      const contentH = scale < 1 ? naturalHeight * scale : naturalHeight;
      canvas.style.transform = scale < 1 ? `scale(${scale})` : '';
      // popup 总尺寸 = 内容尺寸 + padding，min-width / min-height 由 CSS 兜底
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
        this.copyLayoutLastChild(data.elements, widgetContent),
        'add'
      );
      this.onLeave();
      return;
    }

    const lists = [...data.elements];
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
