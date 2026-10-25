import { Injectable, inject } from '@angular/core';
import { defer, EMPTY, Observable, timeout } from 'rxjs';
import type { IAmap, IMarkInfo } from '../interface/IAmap';
import { ScreenService } from './screen.service';

// https://lbs.amap.com/demo-center/js-api
// https://lbs.amap.com/api/jsapi-v2/summary
// https://lbs.amap.com/api/javascript-api/guide/layers/official-layers#default
// https://lbs.amap.com/console/show/picker

@Injectable({
  providedIn: 'root',
})
export class AmapService {
  private screenSerivce = inject(ScreenService);
  constructor() {}

  /** Load the configured SDK in the browser and propagate failures to each subscriber. */
  load(config: IAmap): Observable<any> {
    if (!this.screenSerivce.isPlatformBrowser()) return EMPTY;
    return defer(async () => {
      const { default: loader } = await import('@amap/amap-jsapi-loader');
      return loader.load({ key: config.key, version: config.version, plugins: config.plugins });
    }).pipe(timeout(15_000));
  }

  /** Build the trusted CMS marker popup. */
  getMarker(item: IMarkInfo): any {
    const isLink = item.url ? 'drawer' : '';
    const img = item.img ? `<div class="media"><img src="${item.img}" /></div>` : '';
    const badge1 = item.badge_1 ? `<div>${item.badge_1}</div>` : '';
    const badge2 = item.badge_2 ? `<div>${item.badge_2}</div>` : '';
    return `
    <div class="mark-card reverse p-y-xs p-x-xs">
        ${img}
      <div class="media-body m-left-xs">
        <div class="title one-line ${isLink}" data-url="${item.url}">${item.title}</div>
        <div class="text-dark sub-title one-line">${item.subTitle}</div>
        <div class="meta m-bottom-0 text-primary">
           ${badge1}${badge2}
        </div>
      </div>
      <div class="top arrow"></div>
    </div>
    `;
  }
}
