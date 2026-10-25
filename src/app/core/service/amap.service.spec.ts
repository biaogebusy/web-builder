import { TestBed } from '@angular/core/testing';
import loader from '@amap/amap-jsapi-loader';
import { firstValueFrom } from 'rxjs';
import { vi } from 'vitest';
import type { IAmap } from '@core/interface/IAmap';
import { AmapService } from './amap.service';
import { ScreenService } from './screen.service';

describe('AmapService loading', () => {
  const config = { key: 'test-key', version: '2.0', plugins: ['AMap.Geocoder'] } as IAmap;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
    ] });
  });
  afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });

  it('forwards SDK rejection to subscribers', async () => {
    vi.spyOn(loader, 'load').mockRejectedValue(new Error('SDK unavailable'));
    await expect(firstValueFrom(TestBed.inject(AmapService).load(config)))
      .rejects.toThrow('SDK unavailable');
  });

  it('ends a stalled SDK load after fifteen seconds', async () => {
    vi.useFakeTimers();
    vi.spyOn(loader, 'load').mockReturnValue(new Promise(() => {}));
    const result = firstValueFrom(TestBed.inject(AmapService).load(config));
    const check = expect(result).rejects.toThrow('Timeout');
    await vi.advanceTimersByTimeAsync(15_000);
    await check;
  });

  it('skips the SDK on the server', () => {
    TestBed.overrideProvider(ScreenService, { useValue: { isPlatformBrowser: () => false } });
    const load = vi.spyOn(loader, 'load');
    const next = vi.fn();
    TestBed.inject(AmapService).load(config).subscribe(next);
    expect(load).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
