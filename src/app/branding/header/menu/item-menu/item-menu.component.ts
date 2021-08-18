import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
})
export class ItemMenuComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  @Input() params: any;
  isMegaMenu: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.isMegaMenu = !!this.params.isMegaMenu;
  }
}
