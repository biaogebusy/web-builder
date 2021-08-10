import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Angulartics2BaiduAnalytics } from 'angulartics2/baidu';
import { AppState } from '../mobx/AppState';

declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class BaService {
  constructor(
    private angulartics: Angulartics2BaiduAnalytics,
    @Inject(DOCUMENT) document: any,
    private appState: AppState
  ) {}

  loadBaiduAnalytics(): void {
    window._hmt = window._htm || [];

    const script = document.createElement('script');
    script.src = `https://hm.baidu.com/hm.js?${this.appState.config.baiduAnalytics.id}`;
    document.body.appendChild(script);

    this.angulartics.startTracking();
  }
}
