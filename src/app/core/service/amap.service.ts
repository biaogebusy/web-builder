import { Injectable, inject } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import type { IAmap, IMark, IMarkInfo } from '../interface/IAmap';
import { ScreenService } from './screen.service';

// https://lbs.amap.com/demo-center/js-api
// https://lbs.amap.com/api/jsapi-v2/summary
// https://lbs.amap.com/api/javascript-api/guide/layers/official-layers#default
// https://lbs.amap.com/console/show/picker

@Injectable({
  providedIn: 'root',
})
export class AmapService {
  position$ = new Subject();
  markers$: Subject<IMark> = new Subject();
  screenSerivce = inject(ScreenService);
  constructor() {}

  load(config: IAmap): Observable<any> {
    const $map = new BehaviorSubject<object | boolean>(false);
    if (this.screenSerivce.isPlatformBrowser()) {
      import('@amap/amap-jsapi-loader').then((AMapLoader) => {
        const {
          default: { load },
        } = AMapLoader;
        load({
          key: config.key,
          version: config.version,
          plugins: config.plugins,
          AMapUI: {
            version: '1.1',
            plugins: [],
          },
          Loca: {},
        }).then((amap) => {
          $map.next(amap);
        });
      });
    }
    return $map;
  }

  getMarker(item: IMarkInfo): any {
    const isLink = item.url ? 'drawer' : '';
    const img = item.img
      ? `<div class="media"><img src="${item.img}" /></div>`
      : '';
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
