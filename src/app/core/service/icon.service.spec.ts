import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { IconService } from './icon.service';

describe('IconService', () => {
  let resolver: (name: string, namespace: string) => unknown;
  const registry = {
    addSvgIconResolver: vi.fn(fn => (resolver = fn)),
    addSvgIconSetLiteral: vi.fn(),
  };
  const screen = { isPlatformServer: vi.fn(() => false) };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatIconRegistry, useValue: registry },
        { provide: ScreenService, useValue: screen },
      ],
    });
  });

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('does not fetch the name catalog while registering public-page icons', () => {
    TestBed.inject(IconService).loadSvgResources();

    TestBed.inject(HttpTestingController).expectNone('/assets/svg-icons/names.json');
  });

  it('shares and caches the catalog across icon fields', () => {
    const service = TestBed.inject(IconService);
    const first = vi.fn();
    const second = vi.fn();
    service.getIconNames().subscribe(first);
    service.getIconNames().subscribe(second);
    TestBed.inject(HttpTestingController)
      .expectOne('/assets/svg-icons/names.json').flush(['home', 'account']);

    expect(first).toHaveBeenCalledWith(['home', 'account']);
    expect(second).toHaveBeenCalledWith(['home', 'account']);
    const cached = vi.fn();
    service.getIconNames().subscribe(cached);
    expect(cached).toHaveBeenCalledWith(['home', 'account']);
    TestBed.inject(HttpTestingController).expectNone('/assets/svg-icons/names.json');
  });

  it('allows a subsequent picker to retry after a failed request', () => {
    const service = TestBed.inject(IconService);
    service.getIconNames().subscribe({ error: () => undefined });
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('/assets/svg-icons/names.json').flush('', {
      status: 503, statusText: 'Unavailable',
    });
    const loaded = vi.fn();
    service.getIconNames().subscribe(loaded);
    http.expectOne('/assets/svg-icons/names.json').flush(['home']);
    expect(loaded).toHaveBeenCalledWith(['home']);
  });

  const url = (value: unknown) =>
    TestBed.inject(DomSanitizer).sanitize(SecurityContext.RESOURCE_URL, value as any);

  it('resolves each icon to its own file in the browser', () => {
    TestBed.inject(IconService).loadSvgResources();

    expect(url(resolver('ab-testing', ''))).toBe('/assets/svg-icons/ab-testing.svg');
    expect(url(resolver('dark_mode', ''))).toBe('/assets/svg-icons/dark_mode.svg');
  });

  it('ignores namespaced and unsafe names', () => {
    TestBed.inject(IconService).loadSvgResources();

    expect(resolver('home', 'custom')).toBeNull();
    expect(resolver('../secret', '')).toBeNull();
  });

  it('registers an empty set on the server', () => {
    screen.isPlatformServer.mockReturnValueOnce(true);
    TestBed.inject(IconService).loadSvgResources();

    expect(registry.addSvgIconSetLiteral).toHaveBeenCalled();
    expect(registry.addSvgIconResolver).not.toHaveBeenCalled();
  });
});
