import { Directive } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

/** Optional menus share Material's native trigger without marking ordinary buttons as collapsed. */
@Directive({
  selector: '[matMenuTriggerFor]',
  host: {
    '[attr.aria-expanded]': 'menu ? menuOpen : null',
  },
})
export class BtnMenuTriggerDirective extends MatMenuTrigger {}
