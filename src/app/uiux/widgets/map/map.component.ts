import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IMark } from '@core/interface/IAmap';
import { AMapState } from '@core/mobx/amap/AMapState';
import { AppState } from '@core/mobx/AppState';
import { AmapService } from '@core/service/amap.service';
import { isArray } from 'lodash-es';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() content: any;
  AMap: any;
  markers: any[];
  geocoder: any;
  map: any;
  center: any;

  constructor(
    private amapState: AMapState,
    private amapService: AmapService,
    private appState: AppState
  ) {}

  ngOnInit(): void {
    this.initMap(this.content);
  }

  initMap(content: any): void {
    this.amapService.load().subscribe(
      (AMap: any) => {
        this.AMap = AMap;
        this.geocoder = new AMap.Geocoder({
          city: this.content?.city || this.appState?.config?.amap?.city,
        });
        let lists = [];
        if (isArray(content)) {
          lists = content;
        } else {
          lists = content.elements;
        }
        this.getPosition(lists);
        this.getMarkers(lists);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // https://lbs.amap.com/demo/javascript-api/example/geocoder/geocoding
  getPosition(lists: any): void {
    if (lists.length > 0) {
      lists.forEach((item: any, index: number) => {
        const address = item.params.address;
        this.geocoder.getLocation(address, (status: any, result: any) => {
          if (status === 'complete' && result.info === 'OK') {
            const location = result.geocodes[0].location;
            item.params.position = [location.lng, location.lat];
            if (item.params.setCenter) {
              this.center = [location.lng, location.lat];
            }
            if (lists.length === index + 1) {
              this.amapState.position$.next(true);
            }
          }
        });
      });
    }
  }

  renderMap(): void {
    const themeStyle = this.appState.theme;
    const amapConfig = this.appState.config?.amap;
    const mapStyle: any = amapConfig.mapStyle;
    const options = this.content?.params;
    const defaultOptions = {
      resizeEnable: true,
      zoom: amapConfig.zoom,
      center: this.center || amapConfig.center,
      mapStyle: themeStyle === 'light-theme' ? mapStyle.light : mapStyle.dark,
      features: amapConfig.features,
    };
    this.map = new this.AMap.Map(
      'map',
      Object.assign({}, defaultOptions, options)
    );
    this.appState.switchChange$.subscribe((theme) => {
      const newMapStyle =
        theme === 'dark-theme' ? mapStyle.dark : mapStyle.light;
      this.map.setMapStyle(newMapStyle);
    });
  }

  getMarkers(lists: any[]): void {
    this.amapState.position$.subscribe((res) => {
      this.renderMap();
      this.onMarkers();
      this.setMarkers(lists);
    });
  }

  setMarkers(lists: any[]): void {
    this.markers = lists.map((item: any) => {
      return new this.AMap.Marker({
        content: this.simpleMarkerTem(),
        position: item.params.position,
        title: item.params.title,
      });
    });
    this.map.add(this.markers);
  }

  simpleMarkerTem(): any {
    return `
      <div class="mark"></div>
    `;
  }

  onMarkers(): void {
    this.amapState.markers$.subscribe((marker: IMark) => {
      const position = this.map
        .getAllOverlays('marker')
        [marker.index].getPosition();
      const popup = new this.AMap.InfoWindow({
        content: marker.marker,
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

  ngOnDestroy(): void {
    this.appState.switchChange$?.unsubscribe();
    this.amapState.position$?.unsubscribe();
    this.amapState.markers$?.unsubscribe();
  }
}
