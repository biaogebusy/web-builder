import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import type { ICoreConfig } from '@core/mobx/IAppConfig';
import { CORE_CONFIG } from '@core/token/core.config';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from '@core/service/config.service';
import { LocalStorageService } from 'ngx-webstorage';
import { THEME } from '@core/token/token-providers';
import { MODE } from '@core/factory/factory';
@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchThemeComponent implements OnInit {
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(DOCUMENT) private document: Document,
    @Inject(THEME) public currentTheme: string,
    private configService: ConfigService,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return index;
  }

  onSwitchTheme(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.removeAttribute('class');
    body.classList.add(theme);
    this.configService.switchChange$.next(theme);
    this.storage.store(MODE, theme);
  }
}
