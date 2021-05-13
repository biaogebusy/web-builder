import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserState } from './mobx/user/UserState';
import { ScreenState } from './mobx/screen/ScreenState';
import { MatDrawer } from '@angular/material/sidenav';
import { AppState } from './mobx/AppState';
import { BrandingState } from './mobx/BrandingStare';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from './service/screen.service';
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
    public appState: AppState,
    public branding: BrandingState,
    private router: ActivatedRoute,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.screen.drawer$.subscribe((res) => {
      this.opened = !this.opened;
    });

    this.router.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          this.screenService.scrollToAnchor(fragment);
        }, 1000);
      }
    });
  }

  updateDrawer(drawer: MatDrawer): void {
    this.screen.updateDrwer(drawer);
  }
}
