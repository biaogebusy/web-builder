import { Component, OnInit, OnDestroy, Input } from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  constructor() {}
  @Input() content: any;
  @Input() relation: any;
  @Input() AMap: any;
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
    this.map = new this.AMap.Map('map', {
      zoom: this.zoom,
      center: this.center,
      mapStyle: this.mapStyle,
      features: this.features,
    });

    const markers = this.content.map((marker: any) => {
      return new this.AMap.Marker({
        content: `
            <div class="mark-card p-y-xs p-x-xs">
              <div class="media m-right-xs">
                <img src="${
                  this.relation[
                    this.relation[marker.relationships.company.data.id]
                      .relationships.logo.data.id
                  ].attributes.uri.url
                }" />
              </div>
              <div class="media-body">
                <div class="mat-h3 m-bottom-xs text-base">${
                  this.relation[marker.relationships.company.data.id].attributes
                    .title
                }</div>
                <div class="mat-h3 m-bottom-xs text-dark">${
                  marker.attributes.title
                }</div>
                <div class="mat-h3 m-bottom-0 text-primary">${
                  marker.attributes.salary.from
                } -
          ${marker.attributes.salary.to} k</div>
              </div>
            </div>`,
        position: this.relation[marker.relationships.company.data.id].position,
        title: marker.attributes.title,
      });
    });
    this.map.add(markers);
  }

  ngOnDestroy(): void {
    this.map.destroy();
  }
}
