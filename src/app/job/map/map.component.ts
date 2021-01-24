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
  markers: any[];
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
    this.onMarkers();
  }

  getMarkers(): void {
    this.amapState.position$.subscribe((res) => {
      this.markers = this.content.map((marker: any) => {
        const obj = {
          logo: this.relation[
            this.relation[marker.relationships.company.data.id].relationships
              .logo.data.id
          ].attributes.uri.url,
          company: this.relation[marker.relationships.company.data.id]
            .attributes.title,
          title: marker.attributes.title,
          salary: {
            from: marker.attributes.salary.from,
            to: marker.attributes.salary.to,
          },
        };
        return new this.AMap.Marker({
          content: this.markerTem(obj),
          position: this.relation[marker.relationships.company.data.id]
            .position,
          title: marker.attributes.title,
        });
      });
      this.map.add(this.markers);
    });
  }

  markerTem(obj: any): any {
    return `
    <div class="mark-card p-y-xs p-x-xs">
      <div class="media m-right-xs">
        <img src="${obj.logo}" />
      </div>
      <div class="media-body">
        <div class="mat-h4 m-bottom-xs text-base">${obj.company}</div>
        <div class="mat-h4 m-bottom-xs text-dark title">${obj.title}</div>
        <div class="mat-h3 m-bottom-0 text-primary">
        ${obj.salary.from} - ${obj.salary.to} k
        </div>
      </div>
    </div>
    `;
  }

  onMarkers() {
    this.amapState.markers$.subscribe((marker: any) => {
      this.map.setCenter(
        this.relation[marker.relationships.company.data.id].position
      );
    });
  }

  ngOnDestroy(): void {
    this.map.destroy();
  }
}
