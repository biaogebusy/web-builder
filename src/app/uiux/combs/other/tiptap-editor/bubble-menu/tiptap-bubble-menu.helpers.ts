import { isTextSelection } from '@tiptap/core';
import type { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

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
