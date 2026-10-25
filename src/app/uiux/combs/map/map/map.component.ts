import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  viewChild,
  signal,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  effect,
  inject,
  input,
  DestroyRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { IAmap, IMap, IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { ConfigService } from '@core/service/config.service';
import { THEME } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/state/ContentState';
import { UtilitiesService } from '@core/service/utilities.service';
import { TranslateModule } from '@ngx-translate/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, LoadingComponent, TranslateModule, BtnComponent],
  host: { '[class.read-only]': 'readOnly()' },
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private theme = inject(THEME);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  /** Map configuration and marker data. */
  readonly content = input.required<IMap>();
  /** Show only known GCJ-02 positions and a plain-text list, without business actions. */
  readonly readOnly = input(false);
  readonly failed = signal(false);
  private readonly canvas = viewChild.required<ElementRef<HTMLDivElement>>('canvas');
  private positionVersion = 0;
  AMap: any;
  circle: any;
  markers: any[];
  geocoder: any;
  map: any;
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

  constructor() {
    effect(() => {
      const c = this.content();
      if (!c || !this.map) {
        return;
      }
      const { elements, model } = c;
      if (!this.mapLoading && elements) {
        this.getPositionAndMarkers(elements);
      }
      if (this.readOnly()) return;
      if (model?.enableCircle) {
        if (model.circle.lnglat) {
          this.setFitView();
        } else {
          this.utilService.openSnackbar('点击地图复制经纬度', 'ok');
        }
      }

      if (!model?.enableCircle && this.circle) {
        this.map.remove(this.circle);
        this.circle = undefined;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initMap();
    }
  }

  ngOnDestroy(): void {
    this.positionVersion++;
    this.currentInfoWindow?.close();
    this.map?.destroy();
    this.map = undefined;
  }

  /** Resolve missing CMS positions without mutating input or accepting stale callbacks. */
  getPositionAndMarkers(lists: any[]): void {
    const version = ++this.positionVersion;
    this.currentInfoWindow?.close();
    if (this.markers?.length) this.clearMarkers();
    const known = (item: any) => Array.isArray(item.position) && item.position.length === 2 &&
      item.position.every((value: unknown) => typeof value === 'number' && Number.isFinite(value));
    if (this.readOnly() || lists.every(known)) {
      this.getMarkers(lists.filter(known));
      return;
    }
    // Geocoding must not mutate inputs or let an old callback replace newer markers.
    void Promise.all(lists.map(item => {
      if (known(item)) return Promise.resolve(item);
      return new Promise(resolve => this.geocoder.getLocation(
        item.address, (status: string, result: any) => {
        const location = result?.geocodes?.[0]?.location;
        resolve(status === 'complete' && result.info === 'OK' && location
          ? { ...item, position: [location.lng, location.lat] } : undefined);
      }));
    })).then(items => {
      if (this.destroyRef.destroyed || version !== this.positionVersion) return;
      this.getMarkers(items.filter(Boolean));
    });
  }

  /** Load the SDK for this canvas without retaining a destroyed subscriber. */
  initMap(): void {
    const amapConfig: IAmap = this.coreConfig.amap;
    if (!amapConfig?.key) {
      this.failed.set(true);
      return;
    }
    this.mapLoading = true;
    this.amapService.load(amapConfig).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (AMap: any) => {
        if (!AMap) return;
        try {
          this.AMap = AMap;
          if (!this.readOnly()) {
            this.geocoder = new AMap.Geocoder({
              city: this.content()?.city || amapConfig.city || '全国',
            });
          }
          this.renderMap();
          this.mapLoading = false;
          this.cd.markForCheck();
        } catch {
          this.onLoadFailure();
        }
      },
      error: () => this.onLoadFailure(),
    });
  }

  private onLoadFailure(): void {
    this.currentInfoWindow?.close();
    this.map?.destroy();
    this.map = undefined;
    this.mapLoading = false;
    this.failed.set(true);
  }

  /** Create an instance owned by the rendered canvas. */
  renderMap(): void {
    const amapConfig = this.coreConfig?.amap;
    const mapStyle = amapConfig.mapStyle || {};
    const content = this.content();
    const options = this.readOnly() ? {
      center: content.elements[0]?.position, zoom: 12, viewMode: '2D',
      scrollWheel: false, keyboardEnable: false, isHotspot: false, animateEnable: false,
    } : content?.params;
    const defaultOptions = {
      resizeEnable: true,
      zoom: amapConfig.zoom,
      center: amapConfig.center,
      mapStyle: this.theme === 'dark-theme' ? mapStyle.dark : mapStyle.light,
      features: amapConfig.features,
    };
    this.map = new this.AMap.Map(this.canvas().nativeElement,
      Object.assign({}, defaultOptions, options));
    if (this.configService?.switchChange$) {
      this.configService.switchChange$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(theme => {
          const newMapStyle = theme === 'dark-theme' ? mapStyle.dark : mapStyle.light;
          if (newMapStyle) this.map?.setMapStyle(newMapStyle);
        });
    }
    this.map.on('resize', () => {
      if (this.readOnly()) this.setFitView();
    });
    if (!this.readOnly()) this.map.on('click', (event: any) => {
      const c = this.content();
      if (c?.model?.enableCircle) {
        const {
          lnglat: { lng, lat },
        } = event;
        const form = c?.form;
        if (form) {
          form.controls['circle'].patchValue({ lnglat: `${lng},${lat}` });
        }
        this.utilService.openSnackbar('已设置中心点', 'ok');
      }
    });
    if (content?.elements) {
      this.getPositionAndMarkers(content.elements);
    }
  }

  /** Replace the instance markers. */
  getMarkers(lists: any[]): void {
    if (this.markers && this.markers.length > 0) {
      this.clearMarkers();
    }
    this.setMarkers(lists);
  }

  /** Remove the markers owned by this map. */
  clearMarkers(): void {
    this.map.remove(this.markers);
    this.markers = [];
  }

  /** Create markers with instance-local hover events. */
  setMarkers(lists: any[]): void {
    this.markers = lists.map((item: any, index: number) => {
      const marker = new this.AMap.Marker({
        content: this.readOnly() ? `<div class="map-number">${index + 1}</div>`
          : this.simpleMarkerTemplate(),
        position: item.position,
        title: this.readOnly() ? String(index + 1) : item.title,
      });
      if (!this.readOnly()) {
        marker.on('mouseover', () => this.showMarker({
          index, item, content: this.amapService.getMarker(item), setCenter: false,
        }));
        marker.on('mouseout', () => this.currentInfoWindow?.close());
      }
      if (item.setCenter && !this.readOnly()) this.map.setCenter(item.position);
      return marker;
    });
    this.map.add(this.markers);
    if (this.readOnly()) this.setFitView();
    this.cd.markForCheck();
  }

  /** Return the shared CMS marker decoration. */
  simpleMarkerTemplate(): any {
    return `
      <div class="mark"></div>
    `;
  }

  /** Open CMS drawer links only in the business map mode. */
  onMarkLink(event: any): void {
    if (!this.readOnly() && event.target.classList?.contains('drawer')) {
      const url = event.target.dataset.url;
      this.contentState.drawerOpened.set(true);
      this.contentState.drawerLoading.set(true);
      this.contentService
        .loadPageContent(url)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((content: IPage) => {
          this.contentState.drawerLoading.set(false);
          this.contentState.drawerContent.set(content);
        });
    }
  }

  private showMarker(marker: IMark): void {
    const position = this.markers[marker.index]?.getPosition();
    if (!position) return;
    this.currentInfoWindow?.close();
    this.currentInfoWindow = new this.AMap.InfoWindow({
      content: marker.content, isCustom: true, offset: new this.AMap.Pixel(15, -2),
    });
    this.currentInfoWindow.open(this.map, position);
    if (marker.setCenter) this.map.setCenter(position);
  }

  /** Fit the displayed markers and preserve the CMS circle behavior. */
  setFitView(): void {
    if (!this.map) return;
    if (this.readOnly()) {
      this.map.setFitView(this.markers, true, [36, 36, 36, 36], 15);
      return;
    }
    this.map.setFitView();
    const c = this.content();
    if (c?.model?.enableCircle) {
      const { lnglat, radius, bg, opacity } = c.model.circle;
      if (!lnglat) {
        this.utilService.openSnackbar('点击地图复制经纬度', 'ok');
        return;
      }
      if (this.circle) {
        this.map.remove(this.circle);
      }
      const [lng, lat] = lnglat.split(',');
      this.circle = new this.AMap.Circle({
        center: new this.AMap.LngLat(lng, lat),
        radius: radius * 1000,
        fillColor: bg,
        fillOpacity: opacity,
        strokeColor: '#fff',
        strokeWeight: 2,
      });
      this.map.add(this.circle);
    }
  }
}
