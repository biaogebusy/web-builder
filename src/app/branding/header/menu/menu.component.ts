import { Component, OnInit, Input } from '@angular/core';
import { ScreenState } from '../../../mobx/screen/ScreenState';
import { AppState } from '../../../mobx/AppState';
import { Event, NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isOpened = false;
  @Input() isDrawer: boolean;
  @Input() content: any;

  constructor(
    public screen: ScreenState,
    public appState: AppState,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (this.isDrawer && event instanceof NavigationStart) {
        this.screen.toggleDrawer(true);
      }
    });
  }

  ngOnInit(): void {}

  onToggle(): void {
    this.isOpened = !this.isOpened;
    this.screen.toggleDrawer(this.isOpened);
  }
}
