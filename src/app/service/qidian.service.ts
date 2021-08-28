import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppState } from '../mobx/AppState';
import { keyBy } from 'lodash-es';

declare var gtag: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class QiDianService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appState: AppState
  ) {}

  loadQiDian(): void {
    const qiDianConfig = this.appState.config.qidian;
    const script = this.document.createElement('script');
    script.src = `https://wp.qiye.qq.com/qidian/${qiDianConfig.id}/${qiDianConfig.key}`;
    script.async = true;
    script.defer = true;
    script.id = `qd${qiDianConfig.id}${qiDianConfig.key}`;
    this.document.body.appendChild(script);
  }
}
