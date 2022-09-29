import { Inject, Injectable } from '@angular/core';
import { DialogService } from './dialog.service';
import { GoogleAnalyticsService } from './ga.service';
import { QiDianService } from './qidian.service';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/core.config';
import type { ICoreConfig } from '@core/mobx/IAppConfig';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private qiDianService: QiDianService,
    private dialogService: DialogService,
    private screenService: ScreenService,
    private notifyService: NotifyService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  init(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.coreConfig) {
        if (this.coreConfig?.googleAnalytics) {
          const id = this.coreConfig.googleAnalytics.id;
          this.googleAnalyticsService.loadGoogleAnalytics(id);
        }
        if (this.coreConfig?.qidian) {
          const qdConfig = this.coreConfig.qidian;
          this.qiDianService.loadQiDian(qdConfig);
        }
        if (this.coreConfig?.dialog?.forceDialog) {
          this.dialogService.forceDialog(this.coreConfig.dialog.forceDialog);
        }
        if (this.coreConfig?.notify?.enable) {
          this.notifyService.watchNotify();
        }
      }
    }
  }
}
