import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { vi } from 'vitest';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { AmapService } from '@core/service/amap.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { MapComponent } from './map.component';

class MapStub {
  static instances: MapStub[] = [];
  on = vi.fn();
  add = vi.fn();
  remove = vi.fn();
  destroy = vi.fn();
  setCenter = vi.fn();
  setFitView = vi.fn();
  constructor(readonly canvas: HTMLElement, readonly options: unknown) {
    MapStub.instances.push(this);
  }
}

class MarkerStub {
  events = new Map<string, () => void>();
  constructor(readonly options: { position: number[]; content: string }) {}
  on(name: string, callback: () => void) { this.events.set(name, callback); return this; }
  getPosition() { return this.options.position; }
}

describe('MapComponent lifecycle', () => {
  const places = [{ title: '<b>Place</b>', description: '<img src=x>', position: [121.5, 31.2] }];
  const popupOpen = vi.fn();
  const geocode = vi.fn();
  const sdk = { Map: MapStub, Marker: MarkerStub,
    Geocoder: class { getLocation = geocode; },
    InfoWindow: class { open = popupOpen; close = vi.fn(); }, Pixel: class {},
  };
  const loader = { load: vi.fn(() => of(sdk)), getMarker: vi.fn(() => '<div>CMS</div>') };

  beforeEach(async () => {
    vi.clearAllMocks();
    MapStub.instances = [];
    loader.load.mockReturnValue(of(sdk));
    await TestBed.configureTestingModule({
      imports: [MapComponent], providers: [provideRouter([]), ...provideUiuxMocks(),
        { provide: CORE_CONFIG, useValue: { amap: { key: 'test', mapStyle: {} } } },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
        { provide: AmapService, useValue: loader }],
    }).compileComponents();
  });

  async function create(readOnly = true, elements = places) {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.componentRef.setInput('readOnly', readOnly);
    fixture.componentRef.setInput('content', { elements });
    await fixture.whenStable();
    return fixture;
  }

  it('owns separate canvases and routes hover events to only their owning map', async () => {
    const first = await create(false);
    const second = await create(false);
    const [a, b] = MapStub.instances;
    expect(a.canvas).not.toBe(b.canvas);
    expect(first.nativeElement.contains(a.canvas)).toBe(true);
    expect(second.nativeElement.contains(b.canvas)).toBe(true);
    first.componentInstance.markers[0].events.get('mouseover')();
    expect(popupOpen).toHaveBeenCalledOnce();
    expect(popupOpen).toHaveBeenCalledWith(a, places[0].position);
    first.destroy();
    expect(a.destroy).toHaveBeenCalledOnce();
    expect(b.destroy).not.toHaveBeenCalled();
  });

  it('keeps plain-text places visible and excludes geocoding and business marker actions', async () => {
    const fixture = await create();
    expect(fixture.nativeElement.textContent).toContain('<b>Place</b>');
    expect(fixture.nativeElement.querySelector('.map-places b, .map-places img')).toBeNull();
    expect(geocode).not.toHaveBeenCalled();
    expect(fixture.componentInstance.markers[0].events.size).toBe(0);
    expect(MapStub.instances[0].setFitView).toHaveBeenCalledWith(
      fixture.componentInstance.markers, true, [36, 36, 36, 36], 15,
    );
    fixture.componentRef.setInput('content', { elements: [] });
    await fixture.whenStable();
    expect(fixture.componentInstance.markers).toEqual([]);
  });

  it('keeps the place list on SDK failure or missing site configuration', async () => {
    loader.load.mockReturnValue(throwError(() => new Error('unavailable')));
    const failed = await create();
    expect(failed.componentInstance.failed()).toBe(true);
    expect(failed.nativeElement.querySelector('.map-places').textContent).toContain('<b>Place</b>');
    expect(failed.componentInstance.mapLoading).toBe(false);
    failed.destroy();
    TestBed.inject<{ amap?: unknown }>(CORE_CONFIG).amap = undefined;
    const missing = await create();
    expect(missing.componentInstance.failed()).toBe(true);
    expect(loader.load).toHaveBeenCalledOnce();
  });

  it('unsubscribes before a late SDK result can create a removed map', async () => {
    const pending = new Subject<typeof sdk>();
    loader.load.mockReturnValue(pending);
    const fixture = await create();
    fixture.destroy();
    pending.next(sdk);
    expect(MapStub.instances).toEqual([]);
    expect(pending.observed).toBe(false);
  });

  it('ignores stale geocoding and preserves caller-owned elements', async () => {
    let resolve!: (status: string, result: unknown) => void;
    geocode.mockImplementation((_address, callback) => { resolve = callback; });
    const element = Object.freeze({ title: 'Old', address: 'Old address' });
    const fixture = TestBed.createComponent(MapComponent);
    fixture.componentRef.setInput('content', { elements: [element] });
    await fixture.whenStable();
    fixture.componentRef.setInput('content', { elements: places });
    await fixture.whenStable();
    resolve('complete', { info: 'OK', geocodes: [{ location: { lng: 1, lat: 2 } }] });
    await fixture.whenStable();
    expect(fixture.componentInstance.markers[0].getPosition()).toEqual(places[0].position);
    expect(element).not.toHaveProperty('position');
  });
});
