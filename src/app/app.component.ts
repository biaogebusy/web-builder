import { Component, OnInit, AfterViewInit, inject, signal } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';
import { ThemeService } from '@core/service/theme.service';
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

  ngOnInit(): void {
    this.configService.init();
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.loading.set(false);
      this.themeService.initTheme();
    }
  }
}
