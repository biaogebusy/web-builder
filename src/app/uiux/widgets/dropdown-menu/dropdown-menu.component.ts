import { Component, Input, OnInit } from '@angular/core';
import type { IDropdowMenu } from '@core/interface/widgets/IWidgets';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.scss'],
    standalone: false
})
export class DropdownMenuComponent implements OnInit {
  @Input() content: IDropdowMenu;
  constructor() {}

  ngOnInit(): void {}
}
