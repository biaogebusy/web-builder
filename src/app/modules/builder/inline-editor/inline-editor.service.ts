import {
  ApplicationRef,
  ComponentRef,
  DOCUMENT,
  EnvironmentInjector,
  Injectable,
  createComponent,
  inject,
} from '@angular/core';
import { Editor, Extensions, Node as TiptapNode } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { BuilderState } from '@core/state/BuilderState';
import { TiptapBubbleMenuComponent } from '@uiux/combs/other/tiptap-editor/bubble-menu/tiptap-bubble-menu.component';

export type InlineEditorProfile = 'rich' | 'inline';

/**
 * inline(单行)档的顶层文档节点:内容直接是行内节点,序列化无 <p> 包裹,
 * 契合标题字段"裸行内 HTML"的存储形态;块级粘贴会被拍平成行内内容
 */
const InlineDocument = TiptapNode.create({
  name: 'doc',
  topNode: true,
  content: 'inline*',
});

export interface IInlineEditorActivateOptions {
  /** 画布内被点击的正文元素(ContenteditDirective 宿主) */
  element: HTMLElement;
  /** 组件配置树中的写回路径(generatePath 产物) */
  path: string;
  /**
   * rich:多段落正文(默认);inline:单行标题,仅行内标记,
   * Enter 提交而非分段,文档无段落包裹
   */
  profile?: InlineEditorProfile;
  /** 触发点击的视口坐标,用于把光标定位到点击处;缺省聚焦到末尾 */
  clickCoords?: { x: number; y: number };
  onActivated?: () => void;
  /** 仅在内容有变化、已写回 BuilderState 后调用 */
  onCommitted?: (html: string) => void;
}

/**
 * 画布内联富文本编辑:在被点击的正文元素上原位挂载 tiptap,替代裸 contenteditable。
 * 全局同一时刻只有一个活跃实例;失焦提交(未修改不写回,避免多余版本快照)、Esc 取消。
 * 本服务只应经由 ContenteditDirective 动态 import,保证 tiptap 不进入公共页面首包。
 */
@Injectable({
  providedIn: 'root',
})
export class InlineEditorService {
  private builder = inject(BuilderState);
  private appRef = inject(ApplicationRef);
  private envInjector = inject(EnvironmentInjector);
  private doc = inject<Document>(DOCUMENT);

  private editor: Editor | null = null;
  private activeElement: HTMLElement | null = null;
  private options: IInlineEditorActivateOptions | null = null;
  /** 挂载前的原始 HTML,取消或未修改时恢复 */
  private originalHtml = '';
  /**
   * 挂载后经 tiptap schema 归一化的基线 HTML。变更检测必须与它比对而不是 originalHtml:
   * 归一化本身(如裸文本包 <p>)不算修改,否则每次点开都会产生一次伪写回
   */
  private initialHtml = '';
  /** 气泡工具栏组件只创建一次,跨激活复用;显隐与挂载由 BubbleMenu 插件接管 */
  private bubbleRef: ComponentRef<TiptapBubbleMenuComponent> | null = null;
  private bubbleFocusOut: ((event: FocusEvent) => void) | null = null;

  /** 测试与调试入口:当前活跃编辑器 */
  get activeEditor(): Editor | null {
    return this.editor;
  }

  isActive(element: HTMLElement): boolean {
    return this.activeElement === element;
  }

  activate(options: IInlineEditorActivateOptions): void {
    const { element } = options;
    // 点击已激活元素(光标移动/选择文字)不重建编辑器
    if (this.activeElement === element) {
      return;
    }
    // 切换到另一个元素前先提交上一个,保证全局唯一实例
    this.commit();

    const bubbleEl = this.ensureBubble();
    const profile = options.profile ?? 'rich';
    this.options = options;
    this.activeElement = element;
    this.originalHtml = element.innerHTML;
    element.innerHTML = '';

    const editor = new Editor({
      element,
      extensions: this.buildExtensions(profile, bubbleEl),
      content: this.originalHtml,
      onBlur: ({ event }) => {
        const next = event.relatedTarget as Node | null;
        // 焦点转入气泡(如链接输入框)不算离开编辑
        if (next && bubbleEl.contains(next)) {
          return;
        }
        // ProseMirror 事件处理中同步销毁编辑器不安全,推迟到微任务
        queueMicrotask(() => this.commit());
      },
      editorProps: {
        attributes: {
          // 样式钩子(见全局 styles.scss):继承宿主排版,仅去掉焦点外框
          class: 'inline-tiptap',
        },
        handleKeyDown: (_view, event) => {
          if (event.key === 'Escape') {
            queueMicrotask(() => this.cancel());
            return true;
          }
          // 单行档:Enter 不分段,视为完成编辑
          if (profile === 'inline' && event.key === 'Enter') {
            queueMicrotask(() => this.commit());
            return true;
          }
          return false;
        },
      },
    });
    this.editor = editor;
    this.initialHtml = editor.getHTML();
    this.focusAt(editor, options.clickCoords);
    // 焦点在气泡内部流转(输入框→按钮)不提交;移出气泡且不回编辑器才提交
    this.bubbleFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && (bubbleEl.contains(next) || element.contains(next))) {
        return;
      }
      queueMicrotask(() => this.commit());
    };
    bubbleEl.addEventListener('focusout', this.bubbleFocusOut);
    this.bubbleRef?.setInput('editor', editor);
    options.onActivated?.();
  }

  /** 提交当前编辑:与归一化基线比对,有变化才写回 BuilderState */
  commit(): void {
    const editor = this.editor;
    const options = this.options;
    if (!editor || !options) {
      return;
    }
    const html = editor.getHTML();
    const changed = html !== this.initialHtml;
    // 清空后 getHTML() 仍是 '<p></p>',与 tiptap-editor comb 一致按空值存储
    const value = editor.isEmpty ? '' : html;
    this.teardown(changed ? value : this.originalHtml);
    if (changed) {
      this.builder.updatePageContentByPath(options.path, value);
      options.onCommitted?.(value);
    }
  }

  /** 放弃当前编辑,恢复进入前的内容,不产生写回 */
  cancel(): void {
    if (!this.editor) {
      return;
    }
    this.teardown(this.originalHtml);
  }

  private teardown(restoreHtml: string): void {
    const bubbleEl = this.bubbleRef?.location.nativeElement as HTMLElement | undefined;
    if (bubbleEl && this.bubbleFocusOut) {
      bubbleEl.removeEventListener('focusout', this.bubbleFocusOut);
    }
    this.bubbleFocusOut = null;
    // 先解除气泡对编辑器的引用(effect cleanup 退订 transaction),再销毁编辑器
    this.bubbleRef?.setInput('editor', null);
    this.editor?.destroy();
    if (this.activeElement) {
      this.activeElement.innerHTML = restoreHtml;
    }
    this.editor = null;
    this.activeElement = null;
    this.options = null;
  }

  /** 按编辑档组装扩展;气泡工具栏两档共用(按钮全部为行内标记) */
  private buildExtensions(profile: InlineEditorProfile, bubbleEl: HTMLElement): Extensions {
    const bubble = BubbleMenu.configure({
      element: bubbleEl,
      // show() 默认把气泡塞进编辑器父元素(即正在编辑的组件内部),
      // 显式挂到 body,避免继承组件样式或被 overflow 裁剪
      appendTo: () => this.doc.body,
    });
    if (profile === 'inline') {
      return [
        InlineDocument,
        StarterKit.configure({
          document: false,
          heading: false,
          blockquote: false,
          bulletList: false,
          orderedList: false,
          listItem: false,
          listKeymap: false,
          codeBlock: false,
          horizontalRule: false,
          hardBreak: false,
          // trailingNode 会向文档尾部补块节点,与 inline* 顶层节点冲突
          trailingNode: false,
          dropcursor: false,
          gapcursor: false,
          // 编辑态点击链接不跳转,避免误触离开画布
          link: {
            openOnClick: false,
          },
        }),
        Highlight,
        // 选区级文字样式(字色/背景/字号),标题同样适用;元素级样式仍归组件设置
        TextStyleKit,
        bubble,
      ];
    }
    return [
      StarterKit.configure({
        link: {
          openOnClick: false,
        },
      }),
      Highlight,
      TextStyleKit,
      // 段落/标题对齐是文档内属性,仅多段落正文可用;气泡的对齐按钮按此探测显隐
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      bubble,
    ];
  }

  /** 把光标定位到点击处;无布局环境(jsdom)或坐标不可解析时回退到末尾 */
  private focusAt(editor: Editor, coords?: { x: number; y: number }): void {
    let pos: number | 'end' = 'end';
    if (coords) {
      try {
        pos = editor.view.posAtCoords({ left: coords.x, top: coords.y })?.pos ?? 'end';
      } catch {
        pos = 'end';
      }
    }
    editor.commands.focus(pos);
  }

  private ensureBubble(): HTMLElement {
    if (!this.bubbleRef) {
      this.bubbleRef = createComponent(TiptapBubbleMenuComponent, {
        environmentInjector: this.envInjector,
      });
      // 挂到变更检测树;宿主元素的 DOM 挂载由 BubbleMenu 插件在显示时完成
      this.appRef.attachView(this.bubbleRef.hostView);
    }
    return this.bubbleRef.location.nativeElement;
  }
}
