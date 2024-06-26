import { Inject, Injectable, Injector } from '@angular/core';
import { DialogService } from './dialog.service';
import { AnalyticsService } from './analytics.service';
import { QiDianService } from './qidian.service';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { Subject } from 'rxjs';
import { ClarityService } from './clarity.service';
import { TourService } from './tour.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public switchChange$ = new Subject();
  constructor(
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    protected injector: Injector
  ) {}

  init(): void {
    const screenService = this.injector.get(ScreenService);
    const analyticsService = this.injector.get(AnalyticsService);
    const qiDianService = this.injector.get(QiDianService);
    const dialogService = this.injector.get(DialogService);
    const clarityService = this.injector.get(ClarityService);
    const tourService = this.injector.get(TourService);
    if (screenService.isPlatformBrowser()) {
      if (this.coreConfig) {
        if (this.coreConfig?.analytics?.ga) {
          const id = this.coreConfig.analytics.ga.id;
          analyticsService.loadGoogleAnalytics(id);
        }
        if (this.coreConfig?.qidian) {
          const qdConfig = this.coreConfig.qidian;
          qiDianService.loadQiDian(qdConfig);
        }
        if (this.coreConfig?.dialog?.forceDialog) {
          dialogService.forceDialog(this.coreConfig.dialog.forceDialog);
        }
        if (this.coreConfig?.clarity?.id) {
          clarityService.init(this.coreConfig.clarity.id);
        }
        if (this.coreConfig?.tour?.enable) {
          tourService.init(this.coreConfig.tour);
        }
        window.gsap = gsap;
        window.gsap.registerPlugin(ScrollTrigger);
      }
    }
  }
}
