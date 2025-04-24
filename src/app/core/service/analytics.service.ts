import { Injectable, inject } from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private utility = inject(UtilitiesService);

  async loadGoogleAnalytics(id: string): Promise<void> {
    // injecting GA main script asynchronously
    const src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    await this.utility.loadScript(src, '', false);

    // preparing GA API to be usable even before the async script is loaded
    window.dataLayer = window.dataLayer || [];
    window.gtag = () => {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id);
  }
}
