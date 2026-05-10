import { Component, Input } from '@angular/core';
import type { IDropdowMenu } from '@core/interface/widgets/IWidgets';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.scss'],
    standalone: false
})
export class DropdownMenuComponent {
  @Input() content: IDropdowMenu;
  constructor() {}

}
