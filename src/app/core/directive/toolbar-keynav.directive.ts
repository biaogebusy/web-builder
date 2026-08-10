import { Directive, Provider } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

/**
 * 编辑类工具栏的 tooltip 约定:即显即隐、统一显示在按钮上方,
 * 避免遮住正下方的编辑内容(tiptap 工具栏/气泡、图片操作条共用)
 */
export const TOOLBAR_TOOLTIP_ABOVE: Provider = {
  provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
  useValue: { showDelay: 0, hideDelay: 0, touchendHideDelay: 1500, position: 'above' },
};

/** WAI-ARIA toolbar 惯例:左右方向键在工具栏按钮间循环移动焦点 */
@Directive({
  selector: '[toolbarKeynav]',
  host: {
    '(keydown)': 'onKeydown($event)',
  },
})
export class ToolbarKeynavDirective {
  onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }
    const buttons = Array.from(
      (event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>(
        'button:not([disabled])'
      )
    );
    const current = (event.target as HTMLElement).closest('button');
    const index = current ? buttons.indexOf(current as HTMLButtonElement) : -1;
    if (index < 0) {
      return;
    }
    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    buttons[(index + step + buttons.length) % buttons.length].focus();
  }
}
