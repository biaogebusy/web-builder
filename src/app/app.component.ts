import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ScreenState } from './core/state/screen/ScreenState';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import { CORE_CONFIG, BRANDING, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { IBranding } from './core/interface/IBranding';
import { Observable } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  authenticated: boolean;
  mobileMenuOpened: boolean;
  sidebarMenuOpened = true;
  opened: boolean;
  loading = false;
  constructor(
    public screen: ScreenState,
    private router: ActivatedRoute,
    private screenService: ScreenService,
    private configService: ConfigService,
    public userService: UserService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(USER) public user: IUser
  ) {}

  ngOnInit(): void {
    this.configService.init();
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.drawer$.subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });

      this.screen.sidebarDrawer$.subscribe(() => {
        this.sidebarMenuOpened = !this.sidebarMenuOpened;
      });

      this.router.fragment.subscribe((fragment) => {
        if (fragment) {
          this.screenService.scrollToAnchor(fragment);
        }
      });
    }
  }
}
