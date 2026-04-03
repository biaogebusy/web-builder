import { Component, OnInit, AfterViewInit, inject, signal, DestroyRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import type { ILanguage } from '@core/interface/IEnvironment';
import { LANG } from '@core/token/token-providers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import { ThemeService } from '@core/service/theme.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, AfterViewInit {
  public loading = signal<boolean>(true);
  private configService = inject(ConfigService);
  private screenService = inject(ScreenService);
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private lang = inject<ILanguage | undefined>(LANG, { optional: true });
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.configService.init();
    const defaultLang =
      this.lang?.langCode || environment.langs?.find(item => item.default)?.langCode || 'zh-hans';
    this.translateService.setFallbackLang(defaultLang);
    this.translateService.use(this.lang?.langCode || defaultLang);
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        const tree = this.router.parseUrl(event.urlAfterRedirects);
        const fragment = tree.fragment;
        if (fragment) {
          this.screenService.scrollToAnchor(fragment);
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading.set(false);
      this.themeService.initTheme();
    }
  }
}
