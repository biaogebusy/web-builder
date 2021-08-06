import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserState } from './mobx/user/UserState';
import { ScreenState } from './mobx/screen/ScreenState';
import { MatDrawer } from '@angular/material/sidenav';
import { AppState } from './mobx/AppState';
import { BrandingState } from './mobx/BrandingStare';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from './service/screen.service';
import { LoadingService } from './service/loading.service';
import { delay } from 'rxjs/operators';
import { GoogleAnalyticsService } from './service/ga.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  authenticated: boolean;
  opened: boolean;
  loading = false;
  constructor(
    public userState: UserState,
    public screen: ScreenState,
    public appState: AppState,
    public branding: BrandingState,
    private router: ActivatedRoute,
    private screenService: ScreenService,
    private loadingservice: LoadingService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    this.appState.configLoadDone$.subscribe((res) => {
      if (res) {
        if (this.appState.config?.googleAnalytics) {
          this.googleAnalyticsService.loadGoogleAnalytics();
        }
        if (this.appState.config?.loading) {
          this.listenToLoading();
        }
      }
    });
  }

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

  listenToLoading(): void {
    this.loadingservice.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }
}
