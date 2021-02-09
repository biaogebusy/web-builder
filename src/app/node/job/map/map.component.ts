import { Component, OnInit, Input } from '@angular/core';
import { AMapState } from '../../../mobx/amap/AMapState';
import { AppState } from '../../../mobx/AppState';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() content: any;
  @Input() relation: any;
  @Input() AMap: any;
  markers: any[];
  map: any;

  constructor(private amapState: AMapState, private appState: AppState) {}

  ngOnInit(): void {
    const themeStyle = this.appState.theme;
    const amapConfig = this.appState.config?.amap;
    const mapStyle: any = amapConfig.mapStyle;
    this.map = new this.AMap.Map('map', {
      resizeEnable: true,
      zoom: amapConfig.zoom,
      center: amapConfig.center,
      mapStyle: themeStyle === 'light-theme' ? mapStyle.light : mapStyle.dark,
      features: amapConfig.features,
    });
    this.getMarkers();
    this.onMarkers();
    this.appState.switchChange$.subscribe((theme) => {
      const newMapStyle =
        theme === 'light-theme' ? mapStyle.light : mapStyle.dark;
      this.map.setMapStyle(newMapStyle);
    });
  }

  getMarkers(): void {
    this.amapState.position$.subscribe((res) => {
      this.markers = this.content.map((marker: any) => {
        const company = marker.relationships.company;
        return new this.AMap.Marker({
          content: this.simpleMarkerTem(this.getRelationObj(marker)),
          position: this.relation[company.data.id].position,
          title: marker.attributes.title,
        });
      });
      this.map.add(this.markers);
    });
  }

  getRelationObj(marker: any): any {
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

    return obj;
  }

  simpleMarkerTem(obj: any): any {
    return `
      <div class="mark"></div>
    `;
  }

  markerTem(obj: any): any {
    return `
    <div class="mark-card p-y-xs p-x-xs">
      <div class="media">
        <img src="${obj.logo}" />
      </div>
      <div class="media-body m-left-xs">
        <div class="mat-h4 m-bottom-xs text-base">${obj.company}</div>
        <div class="mat-h4 m-bottom-xs text-dark title">${obj.title}</div>
        <div class="mat-h3 m-bottom-0 text-primary">
        ${obj.salary.from} - ${obj.salary.to} k
        </div>
      </div>
      <div class="top arrow"></div>
    </div>
    `;
  }

  onMarkers(): void {
    this.amapState.markers$.subscribe((marker: any) => {
      const position = this.map
        .getAllOverlays('marker')
        [marker.index].getPosition();
      const popup = new this.AMap.InfoWindow({
        content: this.markerTem(this.getRelationObj(marker.item)),
        isCustom: true,
        offset: new this.AMap.Pixel(15, -2),
      });
      popup.open(this.map, position);
      this.map.setCenter(position);
    });
  }

  setFitView(): void {
    this.map.setFitView();
  }
}
