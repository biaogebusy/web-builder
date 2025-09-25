import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private isInitialized = false;
  private id = '';
  private router = inject(Router);

  async initialize(id: string): Promise<void> {
    if (this.isInitialized || !id) {
      return;
    }
    this.id = id;
    await this.loadGtagScript();
    this.initializeGtag();
    this.trackPageViews();
    this.isInitialized = true;
  }

  private loadGtagScript(): Promise<void> {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.id}`;
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  private initializeGtag(): void {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', this.id, {
      send_page_view: false,
    });
  }

  private trackPageViews(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.sendPageView();
    });
  }

  sendPageView(): void {
    if (!this.isInitialized) return;
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname + window.location.search,
      send_to: this.id,
    });
  }

  trackEvent(eventName: string, params?: Record<string, any>): void {
    if (!this.isInitialized) return;
    window.gtag('event', eventName, {
      ...params,
      send_to: this.id,
    });
  }
}
