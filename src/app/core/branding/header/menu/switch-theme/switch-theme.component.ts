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
import { ContentService } from '@core/service/content.service';
@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchThemeComponent implements OnInit {
  currrentTheme: string;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(DOCUMENT) private document: Document,
    private configService: ConfigService,
    private storage: LocalStorageService,
    private contentSerivce: ContentService
  ) {}

  ngOnInit(): void {
    this.currrentTheme =
      this.storage.retrieve(this.contentSerivce.MODE) || 'light-theme';
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  onSwitchTheme(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.removeAttribute('class');
    body.classList.add(theme);
    this.configService.switchChange$.next(theme);
    this.currrentTheme = theme;
    this.storage.store(this.contentSerivce.MODE, theme);
  }
}
