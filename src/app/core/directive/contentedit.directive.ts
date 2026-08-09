import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { IMetaEdit } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { generatePath } from '@core/util/dom-path.util';
import { TranslateService } from '@ngx-translate/core';
@Directive({
   selector: '[contentedit]',
  host: {
    '[attr.data-path]': 'contentedit()',
    '(blur)': 'onBlur($event)',
    '(paste)': 'onPaste($event)',
    '(click)': 'onClick($event)',
  },
})
export class ContenteditDirective implements AfterViewInit, OnInit {
  readonly contentedit = input.required<string>();
  /**
   * 编辑形态:plain 维持裸 contenteditable(标签/短文本);
   * rich 原位挂载 tiptap(多段落正文),带气泡格式工具栏;
   * inline 单行 tiptap(标题类),仅行内标记、Enter 提交、无段落包裹
   */
  readonly contenteditProfile = input<'plain' | 'rich' | 'inline'>('plain');

  private componentItem: Element | null = null;
  // 进入编辑时的原始内容，用于跳过未修改的保存，避免产生多余版本快照
  private originalHtml: string | null = null;
  private el = inject(ElementRef);
  private builder = inject(BuilderState);
  private translate = inject(TranslateService);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  // 指令销毁(组件重渲染/路由切换)与动态 import 在途的竞态:销毁后不得再触碰注入器
  private destroyed = false;

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => (this.destroyed = true));
    this.componentItem = this.el.nativeElement.closest('.component-item');
  }

  onBlur(event: FocusEvent): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    if (!this.componentItem || !currentTarget || currentTarget.contentEditable !== 'true') {
      return;
    }
    currentTarget.contentEditable = 'false';
    const changed = currentTarget.innerHTML !== this.originalHtml;
    this.originalHtml = null;
    if (!changed) {
      return;
    }
    const path = generatePath(currentTarget);
    this.builder.updatePageContentByPath(path, currentTarget.innerHTML);
    this.openMetaPanel(currentTarget, path);
  }

  /**
   *
   * @param event
   * 清除剪切板格式
   */
  onPaste(event: ClipboardEvent): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    // 非编辑态不拦截，避免劫持前台页面或嵌套表单控件的粘贴
    if (!this.componentItem || currentTarget?.contentEditable !== 'true') {
      return;
    }
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const selection = window.getSelection();
    if (!clipboardData || !selection?.rangeCount) {
      return;
    }
    const plainText = clipboardData.getData('text/plain');

    // 保存当前选区（光标位置）
    const range = selection.getRangeAt(0);

    // 清除选区，准备插入纯文本
    range.deleteContents();

    // 创建新的文本节点并插入到Range中
    const textNode = document.createTextNode(plainText);
    range.insertNode(textNode);

    // 恢复选区，确保光标位置正确
    range.selectNodeContents(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  onClick(event: MouseEvent): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    if (!this.componentItem || !currentTarget) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    // 已处于编辑态：仅移动光标，不重复刷新右侧面板
    if (currentTarget.contentEditable === 'true') {
      return;
    }
    const path = generatePath(currentTarget);
    if (currentTarget.tagName === 'IMG') {
      const src = currentTarget.getAttribute('src') ?? '';
      // 仅 builder 画布内触发，动态加载编辑表单工厂，避免公共页面静态依赖 builder 模块
      void import('@modules/builder/factory/getInlinImg').then(({ getInlineImg }) => {
        const meta: IMetaEdit = {
          type: 'inline-editor',
          mode: 'img',
          path,
          fullWidth: true,
          ele: currentTarget as HTMLImageElement,
          fields: getInlineImg(currentTarget),
          data: {
            src,
            fileName: src.split('/').pop() ?? '',
            alt: currentTarget.getAttribute('alt'),
            tag: currentTarget.tagName,
          },
        };
        this.builder.rightContent$.next({
          title: this.translate.instant('BUILDER.INLINE_EDITOR.EDIT_IMG'),
          mode: 'over',
          hasBackdrop: false,
          style: {
            'width': '284px',
            'max-width': 'calc(100vw - 50px)',
          },
          elements: [meta],
        });
      });
    } else if (this.contenteditProfile() !== 'plain') {
      const profile = this.contenteditProfile() as 'rich' | 'inline';
      const clickCoords = { x: event.clientX, y: event.clientY };
      // 仅 builder 画布内触发,动态加载 tiptap 内联编辑器,避免公共页面把编辑器打进首包。
      // 不打开右侧文本面板:该面板会向元素注入 <p> 包裹(见 InlineEditComponent.initTextView),
      // 与原位挂载的编辑器互斥;drawer.open() 还会夺焦触发误提交。格式化由气泡工具栏承担
      void import('@modules/builder/inline-editor/inline-editor.service').then(
        ({ InlineEditorService }) => {
          if (this.destroyed) {
            return;
          }
          this.injector.get(InlineEditorService).activate({
            element: currentTarget,
            path,
            profile,
            clickCoords,
          });
        }
      );
    } else {
      currentTarget.contentEditable = 'true';
      this.originalHtml = currentTarget.innerHTML;
      this.openMetaPanel(currentTarget, path);
    }
  }

  openMetaPanel(ele: HTMLElement, path: string): void {
    // 仅 builder 画布内触发，动态加载编辑表单工厂，避免公共页面静态依赖 builder 模块
    void import('@modules/builder/factory/getInlineText').then(({ getInlineText }) => {
      const meta: IMetaEdit = {
        type: 'inline-editor',
        mode: 'text',
        fullWidth: true,
        path,
        ele,
        fields: [getInlineText(ele)],
        data: {
          innerHTML: ele.innerHTML,
          tag: ele.tagName,
        },
      };
      this.builder.rightContent$.next({
        title: this.translate.instant('BUILDER.INLINE_EDITOR.EDIT_TEXT'),
        mode: 'push',
        hasBackdrop: false,
        style: {
          'width': '300px',
          'max-width': 'calc(100vw - 140px)',
        },
        elements: [meta],
      });
    });
  }

  ngAfterViewInit(): void {
    const ele = this.el.nativeElement;
    if (this.componentItem) {
      ele.contentEditable = 'false';
    }
  }
}
