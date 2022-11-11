import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ScreenState } from './core/state/screen/ScreenState';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import { NavigationService } from '@core/service/navigation.service';
import { CORE_CONFIG, BRANDING } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { IBranding } from './core/interface/IBranding';
import { Observable } from 'rxjs';
import { ContentState } from '@core/state/ContentState';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  authenticated: boolean;
  mobileMenuOpened: boolean;
  drawerLoading: boolean;
  drawerContent: any[];
  opened: boolean;
  loading = false;
  constructor(
    public screen: ScreenState,
    private contentState: ContentState,
    private router: ActivatedRoute,
    private screenService: ScreenService,
    private configService: ConfigService,
    public navigation: NavigationService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.navigation.startSaveHistory();
  }

  ngOnInit(): void {
    this.configService.init();
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.drawer$.subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });

      this.contentState.drawerOpened$.subscribe((opened) => {
        this.opened = opened;
      });

      this.contentState.drawerLoading$.subscribe((loading) => {
        this.drawerLoading = loading;
      });

      this.contentState.drawerContent$.subscribe((content) => {
        if (content) {
          this.drawerContent = content;
        } else {
          this.drawerContent = [];
        }
      });

      this.router.fragment.subscribe((fragment) => {
        if (fragment) {
          this.screenService.scrollToAnchor(fragment);
        }
      });
    }
  }

  onBackdrop(): void {
    this.opened = false;
    this.drawerContent = [];
  }

  onDrawer(): void {
    this.doc.getElementsByTagName('body')[0].classList.toggle('disable-scroll');
  }
}
