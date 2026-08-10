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
  // 内联编辑：仅 builder 画布内的静态模板（非 API、无 Mustache 标签）
  private inCanvas = false;
  private inlineEditable = false;
  private pristine: HTMLElement | null = null;
  // 源码定位编辑：画布内的 Mustache/API 模板，点选后在源码中唯一匹配
  private locateBound = false;
  // 自定义 JS 返回的清理函数，重渲染/销毁时调用
  private jsCleanup: (() => void) | null = null;
  // 组件销毁与内联编辑器动态 import 在途的竞态：销毁后不得再触碰注入器
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
    // 画布内点击用于内联/定位编辑，不触发弹窗（预览模式/前台不受影响）
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
   * 执行管理员配置的自定义 JS（content.js）。作者侧已按管理员角色门控（代码编辑器），
   * 运行侧以 new Function 限定入参作用域执行：root 为模板根元素、data 为模板数据。
   * 脚本可 return 一个函数，在重渲染（如分页）或组件销毁时清理（解绑事件、销毁实例）。
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
   * 点哪改哪：给渲染后的元素打索引标记，并保留一份未被运行时库（swiper/echarts）
   * 污染的净拷贝；编辑落点通过标记映射回净拷贝后整体序列化写回 widget.html。
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
    // 点击落在已挂载的编辑器内部:光标与选区交给 tiptap,不重复进入编辑流程
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

  /** 编辑结果按索引写回净拷贝，再整体序列化保存 */
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
   * 画布内联富文本编辑：与正文组件共用 InlineEditorService（tiptap + 气泡工具栏）。
   * 服务只在画布内动态载入，公共页面不会打进编辑器代码；
   * 写回不走 path，由调用方在 onCommitted 里按各自的落盘方式保存。
   * 含块级子元素的容器用 rich 档（保留段落/标题），单段文本用 inline 档（不加 <p> 包裹）
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
    // 含运行时托管内容（图表、轮播结构）的容器整体不可编辑，需点击其内部文本
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
   * 源码定位编辑：渲染结果与源码不一致（Mustache/API）时，点选元素后
   * 在 widget.html 源码中做唯一文本匹配——命中则就地编辑并精确替换该片段，
   * 未命中（数据生成的内容/歧义）则打开代码编辑器并定位到最接近的位置。
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
    // 点击落在已挂载的编辑器内部:光标与选区交给 tiptap,不重复进入编辑流程
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

  /** 编辑结果精确替换源码中的原片段；期间源码被改动（唯一性丢失）则放弃并提示 */
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

  /** 元素内容在源码中唯一命中的片段（优先整段 HTML，回落到纯文本），命中不了返回 null */
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
   * 代码编辑器已打开且属于当前组件时，点击仅在编辑器中定位对应源码，
   * 不进入内联编辑，避免重复弹窗及画布与编辑器的双向写入冲突；
   * 属于其他组件时关闭旧编辑器，继续当前组件的正常编辑流程。
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
   * 图片点哪换哪：可定位时打开媒体库选图并精确替换源码中的 src，
   * 无法定位（src 由数据生成/歧义）则打开代码编辑器定位。
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
