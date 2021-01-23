import { Component, OnInit, OnDestroy } from '@angular/core';
import * as AMapLoader from '@amap/amap-jsapi-loader';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  constructor() {}

  map: any;
  zoom = 13; // PC上，参数zoom可设范围：[3,18]；
  center = [108.32067, 22.817424];
  mapStyle = 'amap://styles/1421728e809147de8bfac4fd1abd2fb3';
  features = ['bg', 'road', 'point']; // ['bg', 'road', 'building', 'point']

  ngOnInit(): void {
    // https://lbs.amap.com/demo-center/js-api
    // https://lbs.amap.com/api/jsapi-v2/summary
    // https://lbs.amap.com/api/javascript-api/guide/layers/official-layers#default
    // https://lbs.amap.com/console/show/picker
    AMapLoader.load({
      key: '33877188af64f0213ff4fa259b1c14b8',
      version: '1.4.15',
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
      .then((AMap: any) => {
        this.map = new AMap.Map('map', {
          zoom: this.zoom,
          center: this.center,
          mapStyle: this.mapStyle,
          features: this.features,
        });
        const company = [
          {
            name: '戴文科技',
            logo:
              'https://job-sit.zhaobg.com/sites/default/files/2021-01/CgqKkVePQ7SAK8dOAABQUAlvNu8191.png',
            lal: [108.278416, 22.876778],
          },
          {
            name: '北部湾港',
            logo:
              'https://job-sit.zhaobg.com/sites/default/files/2021-01/CgqKkVePQ7SAK8dOAABQUAlvNu8191.png',
            lal: [108.389066, 22.758161],
          },
          {
            name: '掌悦网络科技',
            logo:
              'https://job-sit.zhaobg.com/sites/default/files/2021-01/CgqKkVePQ7SAK8dOAABQUAlvNu8191.png',
            lal: [108.395291, 22.810706],
          },
          {
            name: '佳凯智能技术',
            logo:
              'https://job-sit.zhaobg.com/sites/default/files/2021-01/CgqKkVePQ7SAK8dOAABQUAlvNu8191.png',
            lal: [108.27455, 22.865537],
          },
        ];
        const markers = company.map((marker) => {
          return new AMap.Marker({
            content: `
            <div class="mark-card p-y-xs p-x-xs">
              <div class="media m-right-xs">
                <img src="${marker.logo}" />
              </div>
              <div class="media-body">
                <div class="mat-h3 m-bottom-xs text-base">${marker.name}</div>
                <div class="mat-h3 m-bottom-xs text-dark">前端开发</div>
                <div class="mat-h3 m-bottom-0 text-primary">8 - 12k</div>
              </div>
            </div>`,
            position: marker.lal,
            title: marker.name,
          });
        });
        console.log(markers);
        this.map.add(markers);
        console.log('center:', this.map.getCenter());
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  ngOnDestroy(): void {
    this.map.destroy();
  }
}
