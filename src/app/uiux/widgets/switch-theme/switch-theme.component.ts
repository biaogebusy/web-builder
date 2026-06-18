import { ChangeDetectionStrategy, Component, OnInit, inject, DOCUMENT } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, THEME } from '@core/token/token-providers';
import { ConfigService } from '@core/service/config.service';
import { LocalStorageService } from 'ngx-webstorage';
import { THEMKEY } from '@core/factory/factory';
import { ThemeService } from '@core/service/theme.service';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatListModule,
    IconComponent,
  ],
})
export class SwitchThemeComponent implements OnInit {
  coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  theme = inject(THEME);

  currentTheme: string;
  themeService = inject(ThemeService);
  configService = inject(ConfigService);
  storage = inject(LocalStorageService);
  builder = inject(BuilderState);
  contentState = inject(ContentState);
  private doc = inject<Document>(DOCUMENT);

  ngOnInit(): void {
    this.currentTheme = this.theme;
  }

  onSwitchTheme(theme: string): void {
    this.configService.switchChange$.next(theme);
    this.storage.store(THEMKEY, theme);
    this.currentTheme = theme;
    this.themeService.clearCustomTheme();
    this.themeService.setTheme(theme);
  }

  onCustomTheme(): void {
    // builder uses its own right drawer (BuilderState.rightContent$),
    // public pages use the ContentState page drawer.
    if (this.doc.location.pathname.includes('/builder')) {
      this.builder.rightContent$.next({
        title: '自定义主题',
        mode: 'over',
        hasBackdrop: true,
        style: {
          width: '360px',
        },
        elements: [{ type: 'custom-theme', fullWidth: true }],
      });
    } else {
      this.contentState.drawerOpened.set(true);
      this.contentState.drawerContent.set({
        title: '自定义主题',
        body: [{ type: 'custom-theme' }],
      });
    }
  }
}
