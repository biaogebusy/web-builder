import { Editor, Extensions, isTextSelection } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu, { type BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';

/**
 * Extension recipe for multi-paragraph rich text, shared by the tiptap-editor comb
 * (form) and the canvas inline-edit 'rich' profile (InlineEditorService).
 */
export function buildRichExtensions(options: {
  /** Host element for the bubble toolbar, handed to the BubbleMenu extension for positioning and visibility */
  bubbleElement: HTMLElement;
  /** Bubble mount point: the plugin appends to the editor's parent by default, which overflow:hidden containers clip; always mount on body */
  appendTo: () => HTMLElement;
  /** Placeholder text for an empty document (form scenario only; canvas inline editing does not need it) */
  placeholder?: string;
}): Extensions {
  return [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6],
      },
      // Do not navigate when clicking a link while editing, to avoid accidental
      // leaves; opening is done from the link panel. Link color is taken over by
      // the .ProseMirror a styles, no class is injected so it never ends up in the stored HTML
      link: {
        openOnClick: false,
      },
    }),
    // Paragraph/heading alignment is a document-level attribute, only usable in
    // multi-paragraph bodies; the bubble's align buttons probe it for visibility
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Highlight,
    TextStyleKit,
    Image.configure({
      // Keep the constraint in the serialized HTML as well as the editor CSS,
      // so newly inserted images remain responsive when rendered publicly.
      HTMLAttributes: { class: 'tiptap-image' },
    }),
    ...(options.placeholder ? [Placeholder.configure({ placeholder: options.placeholder })] : []),
    BubbleMenu.configure({
      element: options.bubbleElement,
      appendTo: options.appendTo,
      shouldShow: shouldShowBubbleMenu,
    }),
  ];
}

/**
 * Keep BubbleMenu's default visibility rules while making delayed plugin updates safe during
 * teardown. The upstream predicate reads the global `document`, which may already be gone when
 * a debounced update runs after an Angular fixture has been destroyed.
 */
export const shouldShowBubbleMenu: NonNullable<BubbleMenuPluginProps['shouldShow']> = ({
  editor,
  element,
  view,
  state,
  from,
  to,
}) => {
  if (editor.isDestroyed) {
    return false;
  }

  const { doc, selection } = state;
  const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection);
  const activeElement = element.ownerDocument?.activeElement;
  const isChildOfMenu = Boolean(activeElement && element.contains(activeElement));
  const hasEditorFocus = view.hasFocus() || isChildOfMenu;

  return hasEditorFocus && !selection.empty && !isEmptyTextBlock && editor.isEditable;
};

export const ALIGN_ORDER = ['left', 'center', 'right', 'justify'];

/** The align button icon follows the current alignment (defaults to left) */
export function alignIcon(editor: Editor): string {
  const active = ALIGN_ORDER.slice(1).find(align => editor.isActive({ textAlign: align }));
  return `format-align-${active ?? 'left'}`;
}
