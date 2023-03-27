import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, THEME } from '@core/token/token-providers';
import { ConfigService } from '@core/service/config.service';
import { LocalStorageService } from 'ngx-webstorage';
import { MODE } from '@core/factory/factory';
import { ThemeService } from '@core/service/theme.service';
@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchThemeComponent implements OnInit, AfterViewInit {
  currentTheme: string;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(THEME) public theme: string,
    private configService: ConfigService,
    private storage: LocalStorageService,
    private themeService: ThemeService,
    private render2: Renderer2
  ) {}

  ngOnInit(): void {
    this.currentTheme = this.theme;
  }

  ngAfterViewInit(): void {
    this.themeService.initTheme(this.coreConfig, this.render2);
  }

  onSwitchTheme(theme: string): void {
    this.configService.switchChange$.next(theme);
    this.storage.store(MODE, theme);
    this.currentTheme = theme;
    this.themeService.setTheme(theme, this.render2);
  }
}
