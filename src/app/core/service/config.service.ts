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
import { UtilitiesService } from './utilities.service';
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
  private util = inject(UtilitiesService);

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
        if (this.coreConfig?.animate) {
          if (this.coreConfig.librariesUseLocal) {
            this.util.loadStyle('/assets/injects/aos/dist/aos.css');
          } else {
            const aosStyle = this.util.getLibraries('aos', 'cdn', 'style');
            this.util.loadStyle(aosStyle);
          }
        }
        window.gsap = gsap;
        window.gsap.registerPlugin(ScrollTrigger);
      }
    }
  }
}
