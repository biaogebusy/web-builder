import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  Inject,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import type { IAmap, IMap, IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ConfigService } from '@core/service/config.service';
import { THEME } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import { isArray } from 'lodash-es';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() content: IMap;
  AMap: any;
  markers: any[];
  geocoder: any;
  map: any;
  center: any;
  mapLoading = false;

  constructor(
    private amapService: AmapService,
    private configService: ConfigService,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    @Inject(THEME) private theme: string,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initMap(this.content);
      this.amapService.mapLoading$.subscribe((state) => {
        // init map, run once
        if (state) {
          this.getPosition(this.content.elements);
          this.getMarkers(this.content.elements);
        }
      });
    }
  }

  ngOnChanges(change: SimpleChanges): void {
    console.log(change);
    const content = change.content;
    if (!content.firstChange) {
      this.clearMarkers();
      this.getPosition(content.currentValue.elements);
      this.getMarkers(content.currentValue.elements);
    }
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
        this.renderMap();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // https://lbs.amap.com/demo/javascript-api/example/geocoder/geocoding
  getPosition(lists: any): void {
    if (lists.length > 0) {
      if (lists[0].position && isArray(lists[0].position)) {
        this.getMarkers(lists);
      } else {
        lists.forEach((item: any, index: number) => {
          const address = item.address;
          this.geocoder.getLocation(address, (status: any, result: any) => {
            if (status === 'complete' && result.info === 'OK') {
              const location = result.geocodes[0].location;
              item.position = [location.lng, location.lat];
              if (item.setCenter) {
                this.center = [location.lng, location.lat];
              }
              if (lists.length === index + 1) {
                this.getMarkers(lists);
              }
            }
          });
        });
      }
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
    this.amapService.mapLoading$.next(true);
  }

  getMarkers(lists: any[]): void {
    this.onMarkers();
    this.setMarkers(lists);
  }

  clearMarkers() {
    this.map.remove(this.markers);
    this.cd.detectChanges();
  }

  setMarkers(lists: any[]): void {
    this.markers = lists.map((item: any) => {
      return new this.AMap.Marker({
        content: this.simpleMarkerTem(),
        position: item.position,
        title: item.title,
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
