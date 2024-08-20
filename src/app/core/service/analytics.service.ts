import { Injectable, inject } from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';

declare var gtag: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  utility = inject(UtilitiesService);
  constructor() {}

  loadGoogleAnalytics(id: string): void {
    // injecting GA main script asynchronously
    const src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    this.utility.loadScript(src, null, false);

    // preparing GA API to be usable even before the async script is loaded
    window.dataLayer = window.dataLayer || [];
    window.gtag = () => {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id);
  }
}
