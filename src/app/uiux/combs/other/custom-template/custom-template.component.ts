import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ChangeDetectionStrategy,
  input
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
import { ManageService } from '@core/service/manage.service';
import { TranslateService } from '@ngx-translate/core';
declare let Swiper: any;
declare let echarts: any;
@Component({
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
  private pendingEdit: { el: HTMLElement; snippet: string; mode: 'html' | 'text' } | null = null;
  // 自定义 JS 返回的清理函数，重渲染/销毁时调用
  private jsCleanup: (() => void) | null = null;

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
    this.destroyRef.onDestroy(() => this.runJsCleanup());
    this.render(this.content());
  }

  async render(content: any): Promise<void> {
    if (this.screenService.isPlatformBrowser()) {
      const { html, json, isAPI, api } = content;
      if (isAPI && api) {
        this.fetchContent('');
      } else {
        try {
          this.renderView(json, html);
          this.pager.set(null);
          this.setupInlineEdit();
          this.runCustomJs(json ?? {});
        } catch (e) {
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

  fetchContent(params: string): void {
    const { html, api } = this.content();
    if (api) {
      this.nodeService
        .fetch(api.trim(), params)
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
            this.util.openSnackbar(res.message, 'ok');
            this.renderView({}, `<div class="m-5 p-5 bg-red-100 rounded-lg">${res.message}</div>`);
          } else {
            const { rows, pager } = res;
            this.renderView(res, html);
            if (rows && pager) {
              this.pager.set(this.nodeService.handlerPager(pager, rows.length));
            }
            this.runCustomJs(res);
          }
        });
    }
  }

  onPageChange(pageEvent: PageEvent): void {
    const { pageIndex } = pageEvent;
    this.fetchContent(`page=${pageIndex}`);
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
    const js = this.content().js;
    if (!js?.trim()) {
      return;
    }
    this.runJsCleanup();
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
    this.template.addEventListener('focusout', this.onEditBlur);
    this.template.addEventListener('paste', this.onEditPaste);
    this.destroyRef.onDestroy(() => {
      this.template.removeEventListener('click', this.onEditClick);
      this.template.removeEventListener('focusout', this.onEditBlur);
      this.template.removeEventListener('paste', this.onEditPaste);
    });
  }

  private onEditClick = (event: Event): void => {
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
    if (!target.isContentEditable) {
      target.contentEditable = 'true';
      target.focus();
    }
  };

  private onEditBlur = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    if (!target?.isContentEditable || !this.pristine) {
      return;
    }
    target.contentEditable = 'false';
    const index = target.getAttribute('data-xs-i');
    if (index === null) {
      return;
    }
    const source = this.pristine.querySelector(`[data-xs-i="${index}"]`);
    if (!source || source.innerHTML === target.innerHTML) {
      return;
    }
    source.innerHTML = target.innerHTML;
    this.saveTemplate();
  };

  // 粘贴时清除剪切板格式，与 ContenteditDirective 行为一致
  private onEditPaste = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    if (!target?.isContentEditable) {
      return;
    }
    event.preventDefault();
    const clipboardData = (event as ClipboardEvent).clipboardData;
    const selection = window.getSelection();
    if (!clipboardData || !selection?.rangeCount) {
      return;
    }
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(clipboardData.getData('text/plain'));
    range.insertNode(textNode);
    range.selectNodeContents(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  };

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
    this.template.addEventListener('focusout', this.onLocateBlur);
    this.template.addEventListener('paste', this.onEditPaste);
    this.destroyRef.onDestroy(() => {
      this.template.removeEventListener('click', this.onLocateClick);
      this.template.removeEventListener('focusout', this.onLocateBlur);
      this.template.removeEventListener('paste', this.onEditPaste);
    });
  }

  private onLocateClick = (event: Event): void => {
    const target = event.target as HTMLElement | null;
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
    if (target.isContentEditable) {
      return;
    }
    const source = this.content().html ?? '';
    const match = this.findUniqueSnippet(target, source);
    if (match) {
      this.pendingEdit = { el: target, ...match };
      target.contentEditable = 'true';
      target.focus();
    } else {
      this.openCodeEditor(target, source);
    }
  };

  private onLocateBlur = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    const pending = this.pendingEdit;
    if (!target?.isContentEditable || !pending || pending.el !== target) {
      return;
    }
    target.contentEditable = 'false';
    this.pendingEdit = null;
    const updated = pending.mode === 'html' ? target.innerHTML : (target.textContent?.trim() ?? '');
    if (updated === pending.snippet) {
      return;
    }
    const source = this.content().html ?? '';
    if (this.countOccurrences(source, pending.snippet) !== 1) {
      this.util.openSnackbar(
        this.translate.instant('BUILDER.CUSTOM_TEMPLATE.LOCATE_CHANGED'),
        'ok'
      );
      return;
    }
    const index = source.indexOf(pending.snippet);
    this.saveHtml(source.slice(0, index) + updated + source.slice(index + pending.snippet.length));
  };

  private findUniqueSnippet(
    el: HTMLElement,
    source: string
  ): { snippet: string; mode: 'html' | 'text' } | null {
    const html = el.innerHTML;
    if (html && this.countOccurrences(source, html) === 1) {
      return { snippet: html, mode: 'html' };
    }
    const text = el.childElementCount === 0 ? (el.textContent?.trim() ?? '') : '';
    if (text && this.countOccurrences(source, text) === 1) {
      return { snippet: text, mode: 'text' };
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
    const reveal =
      this.findUniqueSnippet(target, source)?.snippet ?? this.fallbackReveal(target, source);
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
