import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AmapService } from '../../service/amap.service';
import { AMapState } from '../../mobx/amap/AMapState';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() content: any;
  @Input() relation: any;
  @Input() AMap: any;
  map: any;

  constructor(private amapService: AmapService, private amapState: AMapState) {}

  ngOnInit(): void {
    this.map = new this.AMap.Map('map', {
      resizeEnable: true,
      zoom: this.amapService.zoom,
      center: this.amapService.center,
      mapStyle: this.amapService.mapStyle,
      features: this.amapService.features,
    });
    this.getMarkers();
  }

  getMarkers(): void {
    this.amapState.position$.subscribe((res) => {
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
          position: this.relation[marker.relationships.company.data.id]
            .position,
          title: marker.attributes.title,
        });
      });
      this.map.add(markers);
    });
  }

  ngOnDestroy(): void {
    this.map.destroy();
  }
}
