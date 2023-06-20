import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  Renderer2,
  Injector,
} from '@angular/core';
import { ScreenState } from './core/state/screen/ScreenState';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import {
  CORE_CONFIG,
  BRANDING,
  USER,
  BUILDERFULLSCREEN,
  DISABLEFOOTER,
} from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { IBranding } from './core/interface/branding/IBranding';
import { Observable } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
import { LocalStorageService } from 'ngx-webstorage';
import { DOCUMENT } from '@angular/common';
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
  opened: boolean;
  loading = false;
  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    private renderer2: Renderer2,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(USER) public user: IUser,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(BUILDERFULLSCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(DISABLEFOOTER) public disableFooter$: Observable<boolean>,
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
    const userService = this.injcetor.get(UserService);
    const storage = this.injcetor.get(LocalStorageService);
    if (screenService.isPlatformBrowser()) {
      themeService.initTheme(this.coreConfig, this.renderer2);
      screen.drawer$.subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });

      this.branding$.subscribe((branding) => {
        if (userService.checkShow(branding.header?.sidebar, this.user)) {
          // init manage sidebar
          if (this.doc.location.pathname.split('/').length === 2) {
            this.enableSidebar = false;
            this.sidebarOpened = false;
          } else {
            this.initSidebar();
          }

          // subject manage sidebar
          this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              const url = event.url;
              if (url.split('/').length === 2) {
                if (this.enableSidebar) {
                  this.enableSidebar = false;
                  this.sidebarOpened = false;
                  screenService.initSidebarStyle(true);
                }
              } else {
                this.initSidebar();
              }
            }
          });
          screen.sidebarDrawer$.subscribe(() => {
            this.sidebarOpened = !this.sidebarOpened;
            storage.store('sidebarOpened', this.sidebarOpened);
          });
        } else {
          this.sidebarOpened = false;
          this.enableSidebar = false;
        }
      });

      this.activateRouter.fragment.subscribe((fragment) => {
        if (fragment) {
          screenService.scrollToAnchor(fragment);
        }
      });
    }
  }

  initSidebar(): void {
    const storage = this.injcetor.get(LocalStorageService);
    this.enableSidebar = true;
    const openState = storage.retrieve('sidebarOpened');
    if (openState === null) {
      this.sidebarOpened = true;
      storage.store('sidebarOpened', true);
    } else {
      this.sidebarOpened = storage.retrieve('sidebarOpened');
    }
  }
}
