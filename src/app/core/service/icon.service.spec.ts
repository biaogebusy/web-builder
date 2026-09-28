import { TestBed } from '@angular/core/testing';
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
        { provide: MatIconRegistry, useValue: registry },
        { provide: ScreenService, useValue: screen },
      ],
    });
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
