import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  Renderer2,
  Injector,
} from '@angular/core';
import { ScreenState } from './core/state/screen/ScreenState';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import {
  CORE_CONFIG,
  BRANDING,
  USER,
  DISABLEBRAND,
  IManageSidebarState,
  MANAGESIDEBARSTATE,
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
    private renderer2: Renderer2,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(DISABLEBRAND) public disableBrand$: Observable<boolean>,
    @Inject(MANAGESIDEBARSTATE)
    public sidebarState$: Observable<IManageSidebarState>,
    private injcetor: Injector
  ) {}

  ngOnInit(): void {
    const configService = this.injcetor.get(ConfigService);
    configService.init();
  }

  ngAfterViewInit(): void {
    const screenService = this.injcetor.get(ScreenService);
    const screen = this.injcetor.get(ScreenState);
    const themeService = this.injcetor.get(ThemeService);
    if (screenService.isPlatformBrowser()) {
      themeService.initTheme(this.coreConfig, this.renderer2);
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
