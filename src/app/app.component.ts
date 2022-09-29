import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { UserState } from './core/mobx/user/UserState';
import { ScreenState } from './core/mobx/screen/ScreenState';
import { MatDrawer } from '@angular/material/sidenav';
import { BrandingState } from './core/mobx/BrandingState';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import { NavigationService } from '@core/service/navigation.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/mobx/IAppConfig';
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
    public branding: BrandingState,
    private router: ActivatedRoute,
    private screenService: ScreenService,
    private configService: ConfigService,
    public navigation: NavigationService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig
  ) {
    this.navigation.startSaveHistory();
  }

  ngOnInit(): void {
    this.configService.init();
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.drawer$.subscribe((res) => {
        this.opened = !this.opened;
      });

      this.router.fragment.subscribe((fragment) => {
        if (fragment) {
          this.screenService.scrollToAnchor(fragment);
        }
      });
    }
  }

  updateDrawer(drawer: MatDrawer): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.updateDrwer(drawer);
    }
  }
}
