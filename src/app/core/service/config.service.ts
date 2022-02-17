import { Injectable } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { ApiService } from '@core/service/api.service';
import { DialogService } from './dialog.service';
import { GoogleAnalyticsService } from './ga.service';
import { LoadingService } from './loading.service';
import { QiDianService } from './qidian.service';
import { delay } from 'rxjs/operators';
import { ScreenService } from './screen.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    private appState: AppState,
    private apiService: ApiService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private qiDianService: QiDianService,
    private dialogService: DialogService,
    private loadingservice: LoadingService,
    private screenService: ScreenService
  ) {}

  init(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.apiService.configLoadDone$.subscribe((res) => {
        if (res) {
          const config = this.appState.config;
          if (config?.googleAnalytics) {
            const id = config.googleAnalytics.id;
            this.googleAnalyticsService.loadGoogleAnalytics(id);
          }
          if (config?.qidian) {
            const qdConfig = config.qidian;
            this.qiDianService.loadQiDian(qdConfig);
          }
          if (config?.loading) {
            if (!this.appState?.meta?.config?.loading) {
              this.listenToLoading();
            }
          }
          if (config?.dialog?.forceDialog) {
            this.dialogService.forceDialog(config.dialog.forceDialog);
          }
        }
      });
    }
  }

  // will remove
  listenToLoading(): void {
    this.loadingservice.loadingSub.pipe(delay(0)).subscribe((loading) => {
      // this.loading = loading;
    });
  }
}
