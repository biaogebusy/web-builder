import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, THEME } from '@core/token/token-providers';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from '@core/service/config.service';
import { LocalStorageService } from 'ngx-webstorage';
import { MODE } from '@core/factory/factory';
@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchThemeComponent implements OnInit {
  currentTheme: string;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(DOCUMENT) private document: Document,
    @Inject(THEME) public theme: string,
    private configService: ConfigService,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentTheme = this.theme;
  }

  onSwitchTheme(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.removeAttribute('class');
    body.classList.add(theme);
    this.configService.switchChange$.next(theme);
    this.storage.store(MODE, theme);
    this.currentTheme = theme;
  }
}
