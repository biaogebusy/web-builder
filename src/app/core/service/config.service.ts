import { Inject, Injectable, inject } from '@angular/core';
import { DialogService } from './dialog.service';
import { AnalyticsService } from './analytics.service';
import { QiDianService } from './qidian.service';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { Subject } from 'rxjs';
import { ClarityService } from './clarity.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public switchChange$ = new Subject();
  screenService = inject(ScreenService);
  analyticsService = inject(AnalyticsService);
  qiDianService = inject(QiDianService);
  dialogService = inject(DialogService);
  clarityService = inject(ClarityService);
  constructor(@Inject(CORE_CONFIG) private coreConfig: ICoreConfig) {}

  init(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.coreConfig) {
        if (this.coreConfig?.analytics?.ga) {
          const id = this.coreConfig.analytics.ga.id;
          this.analyticsService.loadGoogleAnalytics(id);
        }
        if (this.coreConfig?.qidian) {
          const qdConfig = this.coreConfig.qidian;
          this.qiDianService.loadQiDian(qdConfig);
        }
        if (this.coreConfig?.dialog?.forceDialog) {
          this.dialogService.forceDialog(this.coreConfig.dialog.forceDialog);
        }
        if (this.coreConfig?.clarity?.id) {
          this.clarityService.init(this.coreConfig.clarity.id);
        }
        window.gsap = gsap;
        window.gsap.registerPlugin(ScrollTrigger);
        AOS.init();
      }
    }
  }
}
