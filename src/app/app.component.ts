import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { ScreenState } from './core/state/screen/ScreenState';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import { CORE_CONFIG, BRANDING } from '@core/token/token-providers';
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
  coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  branding$ = inject<Observable<IBranding>>(BRANDING);

  mobileMenuOpened: boolean;
  loading = true;
  screen = inject(ScreenState);
  activateRouter = inject(ActivatedRoute);
  configService = inject(ConfigService);
  screenService = inject(ScreenService);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.configService.init();
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading = false;
      this.themeService.initTheme();
      this.screen.drawer$.subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });

      this.activateRouter.fragment.subscribe(fragment => {
        if (fragment) {
          this.screenService.scrollToAnchor(fragment);
        }
      });
    }
  }
}
