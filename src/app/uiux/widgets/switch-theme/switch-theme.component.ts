import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  DOCUMENT,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { ApiService } from '@core/service/api.service';

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
export class SwitchThemeComponent {
  coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  themeService = inject(ThemeService);
  configService = inject(ConfigService);
  storage = inject(LocalStorageService);
  builder = inject(BuilderState);
  contentState = inject(ContentState);
  private apiService = inject(ApiService);
  private doc = inject<Document>(DOCUMENT);

  currentTheme = signal(inject(THEME));
  private configLoaded = toSignal(this.apiService.configLoadDone$, { initialValue: false });
  themes = computed(() => {
    this.configLoaded();
    return this.coreConfig.theme;
  });

  onSwitchTheme(theme: string): void {
    this.configService.switchChange$.next(theme);
    this.storage.store(THEMKEY, theme);
    this.currentTheme.set(theme);
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
