import { Inject, Injectable } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { UtilitiesService } from '@core/service/utilities.service';
import { DOCUMENT } from '@angular/common';

declare var gtag: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(
    private angulartics: Angulartics2GoogleAnalytics,
    private utility: UtilitiesService,
    @Inject(DOCUMENT) private doc: Document
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
    window._hmt = window._hmt || [];
    var hm = this.doc.createElement('script');
    hm.src = `https://hm.baidu.com/hm.js?${id}`;
    var s = this.doc.getElementsByTagName('script')[0];
    if (s.parentNode) {
      s.parentNode.insertBefore(hm, s);
    }
  }
}
