import { Inject, Injectable } from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';
import { DOCUMENT } from '@angular/common';

declare var gtag: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(
    private utility: UtilitiesService,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  loadGoogleAnalytics(id: string): void {
    // injecting GA main script asynchronously
    const src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    this.utility.loadScript(src, null, false);

    // preparing GA API to be usable even before the async script is loaded
    window.dataLayer = window.dataLayer || [];
    window.gtag = () => {
      window.dataLayer.push(arguments);
    };
    gtag('js', new Date());
    gtag('config', id);
  }
}
