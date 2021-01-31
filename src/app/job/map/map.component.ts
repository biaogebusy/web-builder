import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AmapService } from '../../service/amap.service';
import { AMapState } from '../../mobx/amap/AMapState';
import { ThemeState } from '../../mobx/screen/ThemeState';
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

  constructor(
    private amapService: AmapService,
    private amapState: AMapState,
    private themeState: ThemeState
  ) {}

  ngOnInit(): void {
    const themeStyle = this.themeState.theme;
    const mapStyle: any = this.amapService.mapStyle;
    this.map = new this.AMap.Map('map', {
      resizeEnable: true,
      zoom: this.amapService.zoom,
      center: this.amapService.center,
      mapStyle: themeStyle === 'light-theme' ? mapStyle.light : mapStyle.dark,
      features: this.amapService.features,
    });
    this.getMarkers();
    this.onMarkers();
    this.themeState.switchChange$.subscribe((theme) => {
      const newMapStyle =
        theme === 'light-theme' ? mapStyle.light : mapStyle.dark;
      this.map.setMapStyle(newMapStyle);
    });
  }

  getMarkers(): void {
    this.amapState.position$.subscribe((res) => {
      this.markers = this.content.map((marker: any) => {
        const company = marker.relationships.company;
        const attr = marker.attributes;
        const obj = {
          logo: this.relation[
            this.relation[company.data.id].relationships.logo.data.id
          ].attributes.uri.url,
          company: this.relation[company.data.id].attributes.title,
          title: attr.title,
          salary: {
            from: attr.salary.from,
            to: attr.salary.to,
          },
        };
        return new this.AMap.Marker({
          content: this.markerTem(obj),
          position: this.relation[company.data.id].position,
          offset: new this.AMap.Pixel(-100, -150),
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
      <div class="arrow"></div>
    </div>
    `;
  }

  onMarkers(): void {
    this.amapState.markers$.subscribe((marker: any) => {
      this.map.setCenter(
        this.relation[marker.relationships.company.data.id].position
      );
    });
  }
}
