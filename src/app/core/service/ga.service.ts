import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { AppState } from '../mobx/AppState';
import { UtilitiesService } from '@core/service/utilities.service';

declare var gtag: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(
    private angulartics: Angulartics2GoogleGlobalSiteTag,
    @Inject(DOCUMENT) private document: Document,
    private appState: AppState,
    private utility: UtilitiesService
  ) {}

  loadGoogleAnalytics(): void {
    // injecting GA main script asynchronously
    const src = `https://www.googletagmanager.com/gtag/js?id=${this.appState.config.googleAnalytics.id}`;
    this.utility.loadScript(src, null, false);

    // preparing GA API to be usable even before the async script is loaded
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    gtag('js', new Date());

    // tracking current url at app bootstrap
    gtag('config', this.appState.config.googleAnalytics.id);
    this.angulartics.startTracking();
  }
}
