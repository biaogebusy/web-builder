import { Inject, Injectable } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { DialogService } from './dialog.service';
import { GoogleAnalyticsService } from './ga.service';
import { LoadingService } from './loading.service';
import { QiDianService } from './qidian.service';
import { delay } from 'rxjs/operators';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/core.config';
import { ICoreConfig } from '@core/mobx/IAppConfig';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    private appState: AppState,
    private googleAnalyticsService: GoogleAnalyticsService,
    private qiDianService: QiDianService,
    private dialogService: DialogService,
    private loadingservice: LoadingService,
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
        if (this.coreConfig?.loading) {
          if (!this.appState?.meta?.config?.loading) {
            this.listenToLoading();
          }
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

  // will remove
  listenToLoading(): void {
    this.loadingservice.loadingSub.pipe(delay(0)).subscribe((loading) => {
      // this.loading = loading;
    });
  }
}
