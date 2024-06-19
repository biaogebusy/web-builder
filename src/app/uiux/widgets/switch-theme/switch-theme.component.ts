import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, THEME } from '@core/token/token-providers';
import { ConfigService } from '@core/service/config.service';
import { LocalStorageService } from 'ngx-webstorage';
import { THEMKEY } from '@core/factory/factory';
import { ThemeService } from '@core/service/theme.service';
@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchThemeComponent implements OnInit {
  currentTheme: string;
  themeService = inject(ThemeService);
  configService = inject(ConfigService);
  storage = inject(LocalStorageService);
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(THEME) public theme: string,
  ) {}

  ngOnInit(): void {
    this.currentTheme = this.theme;
  }

  onSwitchTheme(theme: string): void {
    this.configService.switchChange$.next(theme);
    this.storage.store(THEMKEY, theme);
    this.currentTheme = theme;
    this.themeService.setTheme(theme);
  }
}
