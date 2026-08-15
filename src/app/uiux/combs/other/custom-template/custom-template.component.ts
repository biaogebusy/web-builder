import { MatPaginatorIntlCro } from '@core/service/paginator.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  inject,
  signal,
  ChangeDetectionStrategy,
  input,
  afterRenderEffect,
} from '@angular/core';
import type { ICustomTemplate, ICustomTemplateDialog } from '@core/interface/IBuilder';
import DOMPurify from 'dompurify';
import { NodeService } from '@core/service/node.service';
import Mustache from 'mustache';
import { IPager } from '@core/interface/widgets/IWidgets';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ScreenService } from '@core/service/screen.service';
import { catchError, filter, of, take, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
import { IDialog } from '@core/interface/IDialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { BuilderState } from '@core/state/BuilderState';
import { generatePath } from '@core/util/dom-path.util';
import type { QueryParams } from '@core/util/http-params.util';
import { ManageService } from '@core/service/manage.service';
import { TranslateService } from '@ngx-translate/core';
declare let Swiper: any;
declare let echarts: any;
@Component({
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss'],
  imports: [MatPaginatorModule],
})
export class CustomTemplateComponent implements AfterViewInit {
  readonly content = input.required<ICustomTemplate>();
  public pager = signal<IPager | null>(null);
  private ele = inject(ElementRef);
  private screenService = inject(ScreenService);
  private nodeService = inject(NodeService);
  private template: Element;
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  private util = inject(UtilitiesService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private manageService = inject(ManageService);
  private translate = inject(TranslateService);
  private dialogClickHandler?: (event: Event) => void;
  // Inline editing: only for static templates inside the builder canvas (non-API, no Mustache tags)
  private inCanvas = false;
  private inlineEditable = false;
  private pristine: HTMLElement | null = null;
  // Source-locate editing: for Mustache/API templates in the canvas, uniquely matches the clicked element in the source
  private locateBound = false;
  // Cleanup function returned by custom JS, called on re-render or destroy
  private jsCleanup: (() => void) | null = null;
  // Race between component destroy and the in-flight dynamic import of the inline editor:
  // after destroy the injector must not be touched
  private destroyed = false;

  constructor() {
    afterRenderEffect(() => {
      void this.render(this.content());
    });
  }

  private static readonly NON_EDITABLE_TAGS = new Set([
    'IMG',
    'STYLE',
    'SCRIPT',
    'CANVAS',
    'VIDEO',
    'IFRAME',
    'INPUT',
    'TEXTAREA',
    'SELECT',
    'BR',
    'HR',
  ]);

  ngAfterViewInit(): void {
    this.template = this.ele.nativeElement.querySelector('.template');
    const { isAPI, html } = this.content();
    this.inCanvas = !!this.ele.nativeElement.closest('.component-item');
    this.inlineEditable = this.inCanvas && !isAPI && !(html ?? '').includes('{{');
    const fontawesome = this.util.getLibraries('fontAwesome', 'cdn', 'style');
    this.util.loadStyle(fontawesome);
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.runJsCleanup();
    });
  }

  async render(content: any): Promise<void> {
    if (this.screenService.isPlatformBrowser()) {
      const { html = '', json, isAPI, api } = content;
      if (isAPI && api) {
        this.fetchContent('');
      } else {
        try {
          this.renderView(json, html);
          this.pager.set(null);
          this.setupInlineEdit();
          this.runCustomJs(json ?? {});
        } catch (e) {
          this.runJsCleanup();
          const error = this.translate.instant('BUILDER.CUSTOM_TEMPLATE.RENDER_ERROR');
          this.renderView({}, `<div class="m-5 p-5 bg-red-100 rounded-lg">${error}</div>`);
          this.pager.set(null);
        }
      }
      if (html.includes('data-swiper')) {
        this.loadSwiper();
      }

      if (html.includes('data-echarts')) {
        this.loadEchars();
      }
    }
  }

  async loadSwiper(): Promise<void> {
    if (this.coreConfig.librariesUseLocal) {
      await this.util.loadStyle('/assets/injects/swiper/swiper-bundle.min.css');
      await this.util.loadScript('/assets/injects/swiper/swiper-bundle.min.js');
    } else {
      const swiperStyle = this.util.getLibraries('swiper', 'cdn', 'style');
      const swiperScript = this.util.getLibraries('swiper', 'cdn', 'script');
      await this.util.loadStyle(swiperStyle);
      await this.util.loadScript(swiperScript);
      this.ele.nativeElement.querySelectorAll('.swiper').forEach((el: any) => {
        if (el) {
          const options = JSON.parse(el.getAttribute('data-swiper'));
          new Swiper(el, options);
        }
      });
    }
  }

  async loadEchars(): Promise<void> {
    const echartsScript = this.util.getLibraries('echarts', 'cdn', 'script');
    await this.util.loadScript(echartsScript);
    this.ele.nativeElement.querySelectorAll('.chart').forEach((el: any) => {
      if (el) {
        const options = JSON.parse(el.getAttribute('data-echarts'));
        const chart = echarts.init(el);
        chart.setOption(options);
      }
    });
  }

  fetchContent(params: QueryParams | string): void {
    const { html, api } = this.content();
    if (api) {
      const langCode = this.nodeService.resolveLangCode(this.ele);
      this.nodeService
        .fetch(api.trim(), params, langCode)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError(error => {
            console.error(error);
            return of({
              ok: false,
              message: error.message,
            });
          })
        )
        .subscribe(res => {
          if (res?.ok === false) {
            this.runJsCleanup();
            this.util.openSnackbar(res.message, 'ok');
            this.renderView({}, `<div class="m-5 p-5 bg-red-100 rounded-lg">${res.message}</div>`);
          } else {
            const { rows, pager } = res;
            this.renderView(res, html);
            if (rows && pager) {
              this.pager.set(this.nodeService.handlePager(pager, rows.length));
            }
            this.runCustomJs(res);
          }
        });
    }
  }

  onPageChange(pageEvent: PageEvent): void {
    const { pageIndex } = pageEvent;
    this.fetchContent({ page: pageIndex });
  }

  renderView(content: any, html: string): void {
    const sanitized = DOMPurify.sanitize(html, {
      ADD_TAGS: ['style'],
      ADD_ATTR: ['data-dialog'],
      FORCE_BODY: true,
    });
    this.template.innerHTML = Mustache.render(sanitized, content);
    this.bindDialogTriggers();
    this.setupLocateEdit();
  }

  private bindDialogTriggers(): void {
    // Clicks inside the canvas drive inline/locate editing, not dialogs (preview/frontend unaffected)
    if (this.inCanvas) {
      return;
    }
    if (this.dialogClickHandler) {
      this.template.removeEventListener('click', this.dialogClickHandler);
      this.dialogClickHandler = undefined;
    }
    const dialogs = this.content().dialogs;
    if (!dialogs?.length) {
      return;
    }
    const dialogMap = new Map<string, ICustomTemplateDialog>();
    dialogs.forEach(d => {
      if (d?.key) {
        dialogMap.set(d.key, d);
      }
    });
    if (dialogMap.size === 0) {
      return;
    }
    this.template.querySelectorAll<HTMLElement>('[data-dialog]').forEach(el => {
      el.style.cursor = 'pointer';
    });
    this.dialogClickHandler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest('[data-dialog]') as HTMLElement | null;
      if (!trigger || !this.template.contains(trigger)) {
        return;
      }
      const key = trigger.getAttribute('data-dialog');
      if (!key) {
        return;
      }
      const config = dialogMap.get(key);
      if (!config) {
        console.warn(`[custom-template] dialog key "${key}" not found in content.dialogs`);
        return;
      }
      event.preventDefault();
      this.openDialog(config);
    };
    this.template.addEventListener('click', this.dialogClickHandler);
    this.destroyRef.onDestroy(() => {
      if (this.dialogClickHandler) {
        this.template.removeEventListener('click', this.dialogClickHandler);
        this.dialogClickHandler = undefined;
      }
    });
  }

  /**
   * Runs admin-configured custom JS (content.js). Authoring is already gated by the
   * administrator role (code editor); on the run side it executes via new Function
   * with a scoped set of arguments: root is the template root element, data the
   * template data. The script may return a function, called to clean up (unbind
   * events, destroy instances) on re-render (e.g. paging) or component destroy.
   */
  private runCustomJs(data: any): void {
    this.runJsCleanup();
    const js = this.content().js;
    if (!js?.trim()) {
      return;
    }
    try {
      const fn = new Function('root', 'data', `'use strict';\n${js}`);
      const cleanup = fn(this.template, data);
      if (typeof cleanup === 'function') {
        this.jsCleanup = cleanup;
      }
    } catch (e) {
      console.error('[custom-template] custom JS error:', e);
    }
  }

  private runJsCleanup(): void {
    try {
      this.jsCleanup?.();
    } catch (e) {
      console.error('[custom-template] custom JS cleanup error:', e);
    }
    this.jsCleanup = null;
  }

  /**
   * Click-to-edit: tags the rendered elements with index markers and keeps a clean
   * copy untouched by runtime libraries (swiper/echarts); edits are mapped back to
   * the clean copy via the markers and serialized into widget.html as a whole.
   */
  private setupInlineEdit(): void {
    if (!this.inlineEditable) {
      return;
    }
    this.template.querySelectorAll('*').forEach((el, i) => {
      el.setAttribute('data-xs-i', String(i));
    });
    this.pristine = this.template.cloneNode(true) as HTMLElement;
    this.template.classList.add('inline-editable');
    this.template.addEventListener('click', this.onEditClick);
    this.destroyRef.onDestroy(() => {
      this.template.removeEventListener('click', this.onEditClick);
    });
  }

  private onEditClick = (event: Event): void => {
    // Click landed inside a mounted editor: leave cursor and selection to tiptap, do not re-enter the edit flow
    if ((event.target as HTMLElement | null)?.isContentEditable) {
      return;
    }
    const target = (event.target as HTMLElement | null)?.closest?.(
      '[data-xs-i]'
    ) as HTMLElement | null;
    if (!target || !this.template.contains(target)) {
      return;
    }
    if (target.tagName === 'IMG') {
      event.preventDefault();
      event.stopPropagation();
      this.handleImgClick(target as HTMLImageElement);
      return;
    }
    if (!this.isEditableElement(target)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (this.revealInOpenEditor(target)) {
      return;
    }
    this.activateEditor(target, event as MouseEvent, html => this.saveIndexed(target, html));
  };

  /** Write the edit result back into the clean copy by index, then serialize and save as a whole */
  private saveIndexed(target: HTMLElement, html: string): void {
    const index = target.getAttribute('data-xs-i');
    const source = index === null ? null : this.pristine?.querySelector(`[data-xs-i="${index}"]`);
    if (!source) {
      return;
    }
    source.innerHTML = html;
    this.saveTemplate();
  }

  /**
   * In-canvas inline rich-text editing: shares InlineEditorService (tiptap + bubble
   * toolbar) with the body component. The service is only loaded dynamically inside
   * the canvas, so public pages never ship editor code; write-back does not go
   * through a path, the caller persists per its own mechanism in onCommitted.
   * Containers with block-level children use the 'rich' profile (keeps
   * paragraphs/headings), single-paragraph text uses 'inline' (no <p> wrapper).
   */
  private activateEditor(
    target: HTMLElement,
    event: MouseEvent,
    onCommitted: (html: string) => void
  ): void {
    const profile = target.querySelector(
      'p, div, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, pre'
    )
      ? 'rich'
      : 'inline';
    void import('@modules/builder/inline-editor/inline-editor.service').then(
      ({ InlineEditorService }) => {
        if (this.destroyed) {
          return;
        }
        this.injector.get(InlineEditorService).activate({
          element: target,
          profile,
          clickCoords: { x: event.clientX, y: event.clientY },
          onCommitted,
        });
      }
    );
  }

  private isEditableElement(el: HTMLElement): boolean {
    if (CustomTemplateComponent.NON_EDITABLE_TAGS.has(el.tagName)) {
      return false;
    }
    if (el.closest('svg')) {
      return false;
    }
    // Containers holding runtime-managed content (charts, carousel structures) are not editable as a whole; click the inner text instead
    if (el.querySelector('canvas, svg, video, iframe, .swiper-slide, [data-echarts]')) {
      return false;
    }
    return true;
  }

  private saveTemplate(): void {
    if (!this.pristine) {
      return;
    }
    const clean = this.pristine.cloneNode(true) as HTMLElement;
    clean.querySelectorAll('[data-xs-i]').forEach(el => el.removeAttribute('data-xs-i'));
    this.saveHtml(clean.innerHTML);
  }

  private saveHtml(html: string): void {
    const path = generatePath(this.ele.nativeElement);
    if (!path) {
      return;
    }
    this.builder.updatePageContentByPath(`${path}.html`, html);
  }

  /**
   * Source-locate editing: when the rendered result differs from the source
   * (Mustache/API), clicking an element performs a unique text match in the
   * widget.html source. On a hit, edit in place and replace exactly that snippet;
   * on a miss (data-generated content/ambiguity), open the code editor and
   * position it at the closest location.
   */
  private setupLocateEdit(): void {
    if (!this.inCanvas || this.inlineEditable || this.locateBound) {
      return;
    }
    this.locateBound = true;
    this.template.classList.add('locate-editable');
    this.template.addEventListener('click', this.onLocateClick);
    this.destroyRef.onDestroy(() => {
      this.template.removeEventListener('click', this.onLocateClick);
    });
  }

  private onLocateClick = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    if (!target || !this.template.contains(target)) {
      return;
    }
    // Click landed inside a mounted editor: leave cursor and selection to tiptap, do not re-enter the edit flow
    if (target.isContentEditable) {
      return;
    }
    if (target.tagName === 'IMG') {
      event.preventDefault();
      event.stopPropagation();
      this.handleImgClick(target as HTMLImageElement);
      return;
    }
    if (!this.isEditableElement(target)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (this.revealInOpenEditor(target)) {
      return;
    }
    const source = this.content().html ?? '';
    const snippet = this.findUniqueSnippet(target, source);
    if (snippet) {
      this.activateEditor(target, event as MouseEvent, html => this.saveLocated(snippet, html));
    } else {
      this.openCodeEditor(target, source);
    }
  };

  /** Replace the original snippet in the source exactly with the edit result; abort with a notice if the source changed in the meantime (uniqueness lost) */
  private saveLocated(snippet: string, updated: string): void {
    const source = this.content().html ?? '';
    if (this.countOccurrences(source, snippet) !== 1) {
      this.util.openSnackbar(
        this.translate.instant('BUILDER.CUSTOM_TEMPLATE.LOCATE_CHANGED'),
        'ok'
      );
      return;
    }
    const index = source.indexOf(snippet);
    this.saveHtml(source.slice(0, index) + updated + source.slice(index + snippet.length));
  }

  /** Snippet of the element's content uniquely matching in the source (full HTML first, falling back to plain text); null if nothing matches */
  private findUniqueSnippet(el: HTMLElement, source: string): string | null {
    const html = el.innerHTML;
    if (html && this.countOccurrences(source, html) === 1) {
      return html;
    }
    const text = el.childElementCount === 0 ? (el.textContent?.trim() ?? '') : '';
    if (text && this.countOccurrences(source, text) === 1) {
      return text;
    }
    return null;
  }

  private countOccurrences(source: string, snippet: string): number {
    if (!snippet) {
      return 0;
    }
    let count = 0;
    let index = source.indexOf(snippet);
    while (index !== -1 && count < 2) {
      count++;
      index = source.indexOf(snippet, index + snippet.length);
    }
    return count;
  }

  private openCodeEditor(target: HTMLElement, source: string): void {
    const path = generatePath(this.ele.nativeElement);
    if (!path) {
      return;
    }
    this.builder.editorCode({ path, content: this.content() }, this.fallbackReveal(target, source));
  }

  /**
   * When the code editor is open and belongs to the current component, a click
   * only locates the matching source in the editor instead of entering inline
   * editing, avoiding duplicate dialogs and two-way write conflicts between
   * canvas and editor; when it belongs to another component, close the old
   * editor and continue the current component's normal edit flow.
   */
  private revealInOpenEditor(target: HTMLElement): boolean {
    const existing = this.dialog.getDialogById('code-editor-dialog');
    if (!existing) {
      return false;
    }
    if (this.builder.editingCodePath() !== generatePath(this.ele.nativeElement)) {
      existing.close();
      return false;
    }
    const source = this.content().html ?? '';
    const reveal = this.findUniqueSnippet(target, source) ?? this.fallbackReveal(target, source);
    if (reveal) {
      this.builder.revealCode$.next(reveal);
    }
    return true;
  }

  private fallbackReveal(target: HTMLElement, source: string): string | undefined {
    const src = target.getAttribute('src') ?? '';
    const text = target.textContent?.trim().slice(0, 80) ?? '';
    const cls = target.classList[0] ?? '';
    return [src, text, cls].find(c => !!c && source.includes(c));
  }

  /**
   * Click-to-swap images: when locatable, opens the media library to pick an image
   * and replaces the src in the source exactly; when not locatable (src generated
   * from data/ambiguous), opens the code editor at the location.
   */
  private handleImgClick(img: HTMLImageElement): void {
    if (this.revealInOpenEditor(img)) {
      return;
    }
    const source = this.content().html ?? '';
    const src = img.getAttribute('src') ?? '';
    if (this.inlineEditable || (src && this.countOccurrences(source, src) === 1)) {
      this.openImgPicker(img);
    } else {
      this.openCodeEditor(img, source);
    }
  }

  private openImgPicker(img: HTMLImageElement): void {
    const time = new Date();
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'manage-media',
          time,
          fullWidth: true,
        },
      },
    };
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '85vw',
      panelClass: this.manageService.mediaDialogClass,
      data: config,
    });
    this.builder.selectedMedia$
      .pipe(
        filter(media => media.time === time),
        take(1),
        takeUntil(dialogRef.afterClosed()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ img: media }) => {
        dialogRef.close();
        this.replaceImgSrc(img, media.src);
      });
  }

  private replaceImgSrc(img: HTMLImageElement, src: string): void {
    const oldSrc = img.getAttribute('src') ?? '';
    if (!src || src === oldSrc) {
      return;
    }
    if (this.inlineEditable && this.pristine) {
      const index = img.getAttribute('data-xs-i');
      const target = index === null ? null : this.pristine.querySelector(`[data-xs-i="${index}"]`);
      if (target) {
        target.setAttribute('src', src);
        img.setAttribute('src', src);
        this.saveTemplate();
        return;
      }
    }
    const source = this.content().html ?? '';
    if (oldSrc && this.countOccurrences(source, oldSrc) === 1) {
      const index = source.indexOf(oldSrc);
      img.setAttribute('src', src);
      this.saveHtml(source.slice(0, index) + src + source.slice(index + oldSrc.length));
    } else {
      this.util.openSnackbar(
        this.translate.instant('BUILDER.CUSTOM_TEMPLATE.LOCATE_IMG_FAIL'),
        'ok'
      );
    }
  }

  private openDialog(config: ICustomTemplateDialog): void {
    const inputData = Array.isArray(config.content) ? config.content : { content: config.content };
    const dialogData: IDialog = {
      disableActions: true,
      inputData,
    };
    const rawPanelClass = config.params?.panelClass;
    const panelClass = Array.isArray(rawPanelClass)
      ? rawPanelClass
      : typeof rawPanelClass === 'string' && rawPanelClass.trim()
        ? rawPanelClass.trim().split(/\s+/)
        : ['close-outside', 'dialog-p-0'];
    this.dialog.open(DialogComponent, {
      width: config.params?.width || 'auto',
      height: config.params?.height || 'auto',
      ...config.params,
      panelClass,
      data: dialogData,
    });
  }
}
