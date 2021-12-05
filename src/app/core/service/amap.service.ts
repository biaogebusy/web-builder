import { Injectable } from '@angular/core';
import * as AMapLoader from '@amap/amap-jsapi-loader';
import { Observable, from } from 'rxjs';
import { AppState } from '../../mobx/AppState';
import { IAmap } from './IAmap';

// https://lbs.amap.com/demo-center/js-api
// https://lbs.amap.com/api/jsapi-v2/summary
// https://lbs.amap.com/api/javascript-api/guide/layers/official-layers#default
// https://lbs.amap.com/console/show/picker

@Injectable({
  providedIn: 'root',
})
export class AmapService {
  constructor(private appState: AppState) {}

  load(): Observable<any> {
    const amapConfig: IAmap = this.appState?.config?.amap;
    return from(
      AMapLoader.load({
        key: amapConfig.key,
        version: amapConfig.version,
        plugins: amapConfig.plugins, // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: [], // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '2.0', // Loca 版本，缺省 1.3.2
        },
      })
    );
  }
}
