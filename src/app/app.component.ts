import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  Renderer2,
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
    public screen: ScreenState,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private screenService: ScreenService,
    private configService: ConfigService,
    private userService: UserService,
    private storage: LocalStorageService,
    private themeService: ThemeService,
    private renderer2: Renderer2,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(USER) public user: IUser,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(BUILDERFULLSCREEN) public builderFullScreen$: Observable<boolean>,
    @Inject(DISABLEFOOTER) public disableFooter$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    this.configService.init();
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.themeService.initTheme(this.coreConfig, this.renderer2);
      this.screen.drawer$.subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });

      this.branding$.subscribe((branding) => {
        if (this.userService.checkShow(branding.header?.sidebar, this.user)) {
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
                  this.screenService.initSidebarStyle(true);
                }
              } else {
                this.initSidebar();
              }
            }
          });
          this.screen.sidebarDrawer$.subscribe(() => {
            this.sidebarOpened = !this.sidebarOpened;
            this.storage.store('sidebarOpened', this.sidebarOpened);
          });
        } else {
          this.sidebarOpened = false;
          this.enableSidebar = false;
        }
      });

      this.activateRouter.fragment.subscribe((fragment) => {
        if (fragment) {
          this.screenService.scrollToAnchor(fragment);
        }
      });
    }
  }

  initSidebar(): void {
    this.enableSidebar = true;
    const openState = this.storage.retrieve('sidebarOpened');
    if (openState === null) {
      this.sidebarOpened = true;
      this.storage.store('sidebarOpened', true);
    } else {
      this.sidebarOpened = this.storage.retrieve('sidebarOpened');
    }
  }
}
