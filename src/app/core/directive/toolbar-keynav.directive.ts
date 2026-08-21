import { Directive, Provider } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

/**
 * Tooltip convention for editing toolbars: show and hide instantly, always above the
 * button, so the tooltip never covers the edited content directly below (shared by the
 * tiptap toolbar/bubble and the image action bar)
 */
export const TOOLBAR_TOOLTIP_ABOVE: Provider = {
  provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
  useValue: { showDelay: 0, hideDelay: 0, touchendHideDelay: 1500, position: 'above' },
};

/** WAI-ARIA toolbar convention: left/right arrow keys cycle focus between toolbar buttons */
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
