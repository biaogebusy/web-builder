import { Injectable } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { UtilitiesService } from '@core/service/utilities.service';

declare var gtag: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(
    private angulartics: Angulartics2GoogleAnalytics,
    private utility: UtilitiesService
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

    // tracking current url at app bootstrap
    gtag('config', id);
    this.angulartics.startTracking();
  }

  loadBaiduAnalytics(id: string): void {
    const src = `https://hm.baidu.com/hm.js?${id}`;
    this.utility.loadScript(src, null, false);
  }
}
