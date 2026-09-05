import { DOCUMENT, Injectable, inject } from '@angular/core';
import { DialogService } from './dialog.service';
import { AnalyticsService } from './analytics.service';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { Subject } from 'rxjs';
import { ClarityService } from './clarity.service';
import { UtilitiesService } from './utilities.service';
import { getLibraryAsset } from '@core/config/library-assets';
import { AOS_ASSETS } from './config.assets';

type WindowWithIdleCallback = Omit<Window, 'requestIdleCallback'> &
  Partial<Pick<Window, 'requestIdleCallback'>>;

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private document = inject<Document>(DOCUMENT);

  public switchChange$ = new Subject();
  private screenService = inject(ScreenService);
  private analyticsService = inject(AnalyticsService);
  private dialogService = inject(DialogService);
  private clarityService = inject(ClarityService);
  private util = inject(UtilitiesService);

  init(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.coreConfig) {
        this.initializeTelemetryWhenIdle();
        if (this.coreConfig?.dialog?.forceDialog) {
          this.dialogService.openForcedDialog(this.coreConfig.dialog.forceDialog);
        }
        if (this.coreConfig?.animate) {
          const source = this.coreConfig.librariesUseLocal ? 'local' : 'cdn';
          this.util.loadStyle(getLibraryAsset(AOS_ASSETS, source, 'style'));
        }
      }
    }
  }

  private initializeTelemetryWhenIdle(): void {
    const view = this.document.defaultView as WindowWithIdleCallback | null;
    if (!view) {
      return;
    }

    const initialize = () => {
      const analyticsId = this.coreConfig.analytics?.ga?.id;
      if (analyticsId) {
        void this.analyticsService.initialize(analyticsId);
      }
      const clarityId = this.coreConfig.clarity?.id;
      if (clarityId) {
        this.clarityService.init(clarityId);
      }
    };

    if (view.requestIdleCallback) {
      view.requestIdleCallback(initialize, { timeout: 3000 });
      return;
    }
    view.setTimeout(initialize, 2000);
  }
}
