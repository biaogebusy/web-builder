import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  inject,
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
  mobileMenuOpened: boolean;
  sidebarOpened: boolean;
  enableSidebar = false;
  loading = false;
  screen = inject(ScreenState);
  activateRouter = inject(ActivatedRoute);
  configService = inject(ConfigService);
  screenService = inject(ScreenService);
  themeService = inject(ThemeService);
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(MANAGE_SIDEBAR_STATE)
    public sidebarState$: Observable<IManageSidebarState>,
  ) {}

  ngOnInit(): void {
    this.configService.init();
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.themeService.initTheme();
      this.screen.drawer$.subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });

      this.activateRouter.fragment.subscribe((fragment) => {
        if (fragment) {
          this.screenService.scrollToAnchor(fragment);
        }
      });
    }
  }
}
