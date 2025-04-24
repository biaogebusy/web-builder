import { Injectable, inject } from '@angular/core';
import { DialogService } from './dialog.service';
import { AnalyticsService } from './analytics.service';
import { ScreenService } from './screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { Subject } from 'rxjs';
import { ClarityService } from './clarity.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  public switchChange$ = new Subject();
  private screenService = inject(ScreenService);
  private analyticsService = inject(AnalyticsService);
  private dialogService = inject(DialogService);
  private clarityService = inject(ClarityService);

  init(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.coreConfig) {
        if (this.coreConfig?.analytics?.ga) {
          const id = this.coreConfig.analytics.ga.id;
          this.analyticsService.initialize(id);
        }
        if (this.coreConfig?.dialog?.forceDialog) {
          this.dialogService.forceDialog(this.coreConfig.dialog.forceDialog);
        }
        if (this.coreConfig?.clarity?.id) {
          this.clarityService.init(this.coreConfig.clarity.id);
        }
        window.gsap = gsap;
        window.gsap.registerPlugin(ScrollTrigger);
      }
    }
  }
}
