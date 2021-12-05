import { Component, Input, OnInit } from '@angular/core';
import { ScreenState } from '../../../../mobx/screen/ScreenState';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() content: any;
  @Input() mobileMenu: any;
  constructor(public screen: ScreenState) {}

  ngOnInit(): void {}
}
