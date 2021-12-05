import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { AppState } from '../mobx/AppState';

declare var gtag: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(
    private angulartics: Angulartics2GoogleGlobalSiteTag,
    @Inject(DOCUMENT) private document: Document,
    private appState: AppState
  ) {}

  loadGoogleAnalytics(): void {
    // injecting GA main script asynchronously
    const script = this.document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.appState.config.googleAnalytics.id}`;
    script.async = true;
    this.document.body.appendChild(script);

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
