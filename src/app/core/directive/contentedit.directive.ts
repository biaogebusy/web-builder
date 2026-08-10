import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { generatePath } from '@core/util/dom-path.util';
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
      // 仅 builder 画布内触发,动态加载图片内联编辑(选中态 + 悬浮操作条),
      // 完整表单经操作条"更多设置"回落 drawer
      void import('@modules/builder/inline-editor/inline-image.service').then(
        ({ InlineImageService }) => {
          if (this.destroyed) {
            return;
          }
          // 传入点击处的环境注入器:媒体库对话框内容(ManageMediaComponent)依赖
          // BUILDER_CONFIG 等路由级令牌,root 单例服务自身的注入器解析不到
          const envInjector = this.injector.get(EnvironmentInjector);
          this.injector
            .get(InlineImageService)
            .select(currentTarget as HTMLImageElement, path, envInjector);
        }
      );
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
      // 兜底档:number-animate(JS 动画持有文本节点)与自定义模板等场景,
      // 原地编辑文本节点、失焦保存;旧文本样式面板已退役,不再随编辑打开
      currentTarget.contentEditable = 'true';
      this.originalHtml = currentTarget.innerHTML;
    }
  }

  ngAfterViewInit(): void {
    const ele = this.el.nativeElement;
    if (this.componentItem) {
      ele.contentEditable = 'false';
    }
  }
}
