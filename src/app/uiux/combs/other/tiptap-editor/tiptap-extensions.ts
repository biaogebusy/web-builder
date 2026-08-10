import { Editor, Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';

/**
 * 多段落富文本的扩展配方:tiptap-editor comb(表单)与画布内联编辑 rich 档
 * (InlineEditorService)共用,保证两处的能力与序列化行为一致——
 * 新增能力(如 iframe/视频扩展)只需改这一处
 */
export function buildRichExtensions(options: {
  /** 气泡工具栏宿主元素,交给 BubbleMenu 扩展定位与显隐 */
  bubbleElement: HTMLElement;
  /** 气泡挂载点:插件默认 append 到编辑器父元素,会被 overflow:hidden 容器裁剪,统一挂 body */
  appendTo: () => HTMLElement;
  /** 空文档占位文案(仅表单场景;画布内联编辑不需要) */
  placeholder?: string;
}): Extensions {
  return [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6],
      },
      // 编辑态点击链接不跳转,避免误触离开;打开动作在链接面板里
      // 链接颜色由 .ProseMirror a 样式接管,不注入 class 以免写进存储的 HTML
      link: {
        openOnClick: false,
      },
    }),
    // 段落/标题对齐是文档内属性,仅多段落正文可用;气泡的对齐按钮按此探测显隐
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Highlight,
    // 选区级文字样式(字色/背景/字号)
    TextStyleKit,
    Image,
    ...(options.placeholder ? [Placeholder.configure({ placeholder: options.placeholder })] : []),
    BubbleMenu.configure({ element: options.bubbleElement, appendTo: options.appendTo }),
  ];
}

export const ALIGN_ORDER = ['left', 'center', 'right', 'justify'];

/** 对齐按钮图标跟随当前对齐方式(默认左对齐) */
export function alignIcon(editor: Editor): string {
  const active = ALIGN_ORDER.slice(1).find(align => editor.isActive({ textAlign: align }));
  return `format-align-${active ?? 'left'}`;
}
