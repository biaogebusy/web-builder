import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { UserState } from './mobx/user/UserState';
import { ScreenState } from './mobx/screen/ScreenState';
import { MatDrawer } from '@angular/material/sidenav';
import { ThemeState } from './mobx/screen/ThemeState';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  authenticated: boolean;
  opened: boolean;
  constructor(
    public userState: UserState,
    public screen: ScreenState,
    public themeState: ThemeState
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.screen.drawer$.subscribe((res) => {
      this.opened = !this.opened;
    });
  }

  updateDrawer(drawer: MatDrawer): void {
    this.screen.updateDrwer(drawer);
  }
}
