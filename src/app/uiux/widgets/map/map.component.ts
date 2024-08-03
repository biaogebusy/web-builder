import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Inject,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  inject,
  DestroyRef,
} from '@angular/core';
import type { IAmap, IMap, IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { ConfigService } from '@core/service/config.service';
import { THEME } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import { isArray } from 'lodash-es';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/state/ContentState';
import { UtilitiesService } from '@core/service/utilities.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnChanges {
  @Input() content: IMap;
  AMap: any;
  circle: any;
  markers: any[];
  geocoder: any;
  map: any;
  center: any;
  mapLoading: boolean;
  currentInfoWindow: any;

  amapService = inject(AmapService);
  configService = inject(ConfigService);
  screenService = inject(ScreenService);
  contentState = inject(ContentState);
  contentService = inject(ContentService);
  utilService = inject(UtilitiesService);
  cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  constructor(
    @Inject(THEME) private theme: string,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initMap();
    }
  }

  ngOnChanges(change: SimpleChanges): void {
    const {
      firstChange,
      currentValue: { elements, model },
    } = change.content;
    if (!this.mapLoading && !firstChange && elements && elements.length > 0) {
      this.getPositionAndMarkers(elements);
    }
    if (model?.enableCircle) {
      if (model.circle.lnglat) {
        this.setFitView();
      } else {
        this.utilService.openSnackbar('点击地图复制经纬度', 'ok');
      }
    }

    if (!model?.enableCire && this.circle) {
      this.map.remove(this.circle);
    }
  }

  getPositionAndMarkers(lists: any[]): void {
    if (lists && lists.length > 0) {
      this.getPosition(lists);
      this.getMarkers(lists);
    }
  }

  initMap(): void {
    const amapConfig: IAmap = this.coreConfig.amap;
    if (!amapConfig) {
      return;
    }
    this.mapLoading = true;
    this.amapService.load(amapConfig).subscribe(
      (AMap: any) => {
        if (AMap) {
          this.AMap = AMap;
          this.geocoder = new AMap.Geocoder({
            city: this.content?.city || this.coreConfig?.amap?.city || '全国',
          });
          this.mapLoading = false;
          this.cd.detectChanges();
          this.renderMap();
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }

  // https://lbs.amap.com/demo/javascript-api/example/geocoder/geocoding
  getPosition(lists: any): void {
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
      Object.assign({}, defaultOptions, options),
    );
    if (this.configService?.switchChange$) {
      this.configService.switchChange$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((theme) => {
          const newMapStyle =
            theme === 'dark-theme' ? mapStyle.dark : mapStyle.light;
          this.map.setMapStyle(newMapStyle);
        });
    }
    this.map.on('click', (event: any) => {
      if (this.content?.model.enableCircle) {
        const {
          lnglat: { lng, lat },
        } = event;
        const form = this.content?.form;
        if (form) {
          form.controls['circle'].patchValue({ lnglat: `${lng},${lat}` });
        }
        this.utilService.openSnackbar('已设置中心点', 'ok');
      }
    });
    this.getPositionAndMarkers(this.content.elements);
  }

  getMarkers(lists: any[]): void {
    this.onMarkers();
    if (this.markers && this.markers.length > 0) {
      this.clearMarkers();
    }
    this.setMarkers(lists);
  }

  clearMarkers(): void {
    this.map.remove(this.markers);
    this.cd.detectChanges();
  }

  setMarkers(lists: any[]): void {
    this.markers = lists.map((item: any, index: number) => {
      return new this.AMap.Marker({
        content: this.simpleMarkerTem(),
        position: item.position,
        title: item.title,
      })
        .on('mouseover', (e: any) => {
          const obj: IMark = {
            index,
            item,
            content: this.amapService.getMarker(item),
            setCenter: false,
          };
          this.amapService.markers$.next(obj);
        })
        .on('mouseout', () => {
          this.currentInfoWindow.close();
        });
    });
    this.map.add(this.markers);
    this.cd.detectChanges();
  }

  simpleMarkerTem(): any {
    return `
      <div class="mark"></div>
    `;
  }

  onMarkLink(event: any): void {
    if (event.target.className.includes('drawer')) {
      const url = event.target.dataset.url;
      this.contentState.drawerOpened$.next(true);
      this.contentState.drawerLoading$.next(true);
      this.contentService
        .loadPageContent(url)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((content: IPage) => {
          this.contentState.drawerLoading$.next(false);
          this.contentState.drawerContent$.next(content);
        });
    }
  }

  onMarkers(): void {
    this.amapService.markers$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((marker: IMark) => {
        const position = this.map
          .getAllOverlays('marker')
          [marker.index].getPosition();
        this.currentInfoWindow = new this.AMap.InfoWindow({
          content: marker.content,
          isCustom: true,
          offset: new this.AMap.Pixel(15, -2),
        });
        this.currentInfoWindow.open(this.map, position);
        if (marker.setCenter) {
          this.map.setCenter(position);
        }
      });
  }

  setFitView(): void {
    this.map.setFitView();
    if (this.content?.model?.enableCircle) {
      const { lnglat, radius, bg, opacity } = this.content.model.circle;
      if (!lnglat) {
        this.utilService.openSnackbar('点击地图复制经纬度', 'ok');
        return;
      }
      if (this.circle) {
        this.map.remove(this.circle);
      }
      const [lng, lat] = lnglat.split(',');
      this.circle = new this.AMap.Circle({
        center: new this.AMap.LngLat(lng, lat), // 圆心位置
        radius: radius * 1000, // 圆半径
        fillColor: bg, // 圆形填充颜色
        fillOpacity: opacity,
        strokeColor: '#fff', // 描边颜色
        strokeWeight: 2, // 描边宽度
      });
      this.map.add(this.circle);
    }
  }
}
