import { Injectable } from '@angular/core';
import * as AMapLoader from '@amap/amap-jsapi-loader';
import { Observable, from } from 'rxjs';

// https://lbs.amap.com/demo-center/js-api
// https://lbs.amap.com/api/jsapi-v2/summary
// https://lbs.amap.com/api/javascript-api/guide/layers/official-layers#default
// https://lbs.amap.com/console/show/picker

@Injectable({
  providedIn: 'root',
})
export class AmapService {
  city = '0771';
  zoom = 13; // PC上，参数zoom可设范围：[3,18]；
  center = [108.32067, 22.817424];
  mapStyle = 'amap://styles/1421728e809147de8bfac4fd1abd2fb3';
  features = ['bg', 'road', 'point']; // ['bg', 'road', 'building', 'point']

  constructor() {}

  load(): Observable<any> {
    return from(
      AMapLoader.load({
        key: '33877188af64f0213ff4fa259b1c14b8',
        version: '1.4.15',
        plugins: ['AMap.Geocoder'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
