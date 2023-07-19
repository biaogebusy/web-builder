import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  Injector,
} from '@angular/core';
import { ScreenState } from './core/state/screen/ScreenState';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import {
  CORE_CONFIG,
  BRANDING,
  IManageSidebarState,
  MANAGE_SIDEBAR_STATE,
} from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { IBranding } from './core/interface/branding/IBranding';
import { Observable } from 'rxjs';
import { ThemeService } from '@core/service/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  authenticated: boolean;
  mobileMenuOpened: boolean;
  sidebarOpened: boolean;
  enableSidebar = false;
  loading = false;
  constructor(
    private activateRouter: ActivatedRoute,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(MANAGE_SIDEBAR_STATE)
    public sidebarState$: Observable<IManageSidebarState>,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    const configService = this.injector.get(ConfigService);
    configService.init();
  }

  ngAfterViewInit(): void {
    const screenService = this.injector.get(ScreenService);
    const screen = this.injector.get(ScreenState);
    const themeService = this.injector.get(ThemeService);
    if (screenService.isPlatformBrowser()) {
      themeService.initTheme(this.coreConfig);
      screen.drawer$.subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });

      this.activateRouter.fragment.subscribe((fragment) => {
        if (fragment) {
          screenService.scrollToAnchor(fragment);
        }
      });
    }
  }
}
