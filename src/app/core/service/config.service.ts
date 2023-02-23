import { Inject, Injectable } from '@angular/core';
import { DialogService } from './dialog.service';
import { GoogleAnalyticsService } from './ga.service';
import { QiDianService } from './qidian.service';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { NotifyService } from './notify.service';
import { Subject } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public switchChange$ = new Subject();
  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private qiDianService: QiDianService,
    private dialogService: DialogService,
    private screenService: ScreenService,
    private notifyService: NotifyService,
    private navigationService: NavigationService,
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
        if (this.coreConfig?.checkIE?.enable) {
          // console.log(this.navigationService.isIE);
          if (this.navigationService.isIE) {
            this.dialogService.openDynamicDialog(
              this.coreConfig.checkIE.dialog
            );
          }
        }
      }
    }
  }
}
