import { Component, OnInit, AfterViewInit, inject, signal } from '@angular/core';
import { ScreenState } from './core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ThemeService } from '@core/service/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, AfterViewInit {
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  public mobileMenuOpened: boolean;
  public loading = signal<boolean>(true);
  private screen = inject(ScreenState);
  private configService = inject(ConfigService);
  private screenService = inject(ScreenService);
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.configService.init();
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading.set(false);
      this.themeService.initTheme();
      this.screen.drawer$.subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });
    }
  }
}
