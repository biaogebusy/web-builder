import { Component, OnInit, Input } from '@angular/core';
import { ScreenState } from '../../../mobx/screen/ScreenState';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isOpened = false;
  @Input() isDrawer: boolean;

  constructor(public screen: ScreenState) {}

  ngOnInit(): void {}

  onToggle(): void {
    this.isOpened = !this.isOpened;
    this.screen.toggleDrawer(this.isOpened);
  }
}
