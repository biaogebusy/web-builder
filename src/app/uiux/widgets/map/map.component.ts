import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import type { IMap, IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';
import { isArray } from 'lodash-es';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { IAmap } from '../../../core/interface/IAmap';
import { ConfigService } from '@core/service/config.service';
import { THEME } from '@core/token/token-providers';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() content: IMap;
  AMap: any;
  markers: any[];
  geocoder: any;
  map: any;
  center: any;

  constructor(
    private amapService: AmapService,
    private configService: ConfigService,
    @Inject(THEME) private theme: string,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {
    this.initMap(this.content);
  }

  initMap(content: IMap): void {
    const amapConfig: IAmap = this.coreConfig.amap;
    if (!amapConfig) {
      return;
    }
    this.amapService.load(amapConfig).subscribe(
      (AMap: any) => {
        this.AMap = AMap;
        this.geocoder = new AMap.Geocoder({
          city: this.content?.city || this.coreConfig?.amap?.city || '全国',
        });
        this.getPosition(content.elements);
        this.getMarkers(content.elements);
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
              this.amapService.position$.next(true);
            }
          }
        });
      });
    }
  }

  renderMap(): void {
    const amapConfig = this.coreConfig?.amap;
    const mapStyle: any = amapConfig.mapStyle;
    const options = this.content?.params;
    const defaultOptions = {
      resizeEnable: true,
      zoom: amapConfig.zoom,
      center: this.center || amapConfig.center,
      mapStyle: this.theme === 'dark-theme' ? mapStyle.dark : mapStyle.light,
      features: amapConfig.features,
    };
    this.map = new this.AMap.Map(
      'map',
      Object.assign({}, defaultOptions, options)
    );
    if (this.configService?.switchChange$) {
      this.configService.switchChange$.subscribe((theme) => {
        const newMapStyle =
          theme === 'dark-theme' ? mapStyle.dark : mapStyle.light;
        this.map.setMapStyle(newMapStyle);
      });
    }
  }

  getMarkers(lists: any[]): void {
    this.amapService.position$.subscribe((res) => {
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
    this.amapService.markers$.subscribe((marker: IMark) => {
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

  ngOnDestroy(): void {}
}
