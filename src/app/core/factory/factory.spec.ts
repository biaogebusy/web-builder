import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { BuilderState } from '@core/state/BuilderState';
import { vi } from 'vitest';
import { LocalStorageService } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

import { initApp, mediaAssetsFactory, themeFactory } from './factory';
import { ContentService } from '@core/service/content.service';
import { ComponentService } from '@core/service/component.service';
import { ThemeService } from '@core/service/theme.service';
import { builderCurrentPageFactory } from './builder-factory';
import { NodeService } from '@core/service/node.service';
import { UserService } from '@core/service/user.service';
import { ContentState } from '@core/state/ContentState';

describe('initApp', () => {
  it('waits for config and the selected theme before allowing bootstrap', async () => {
    let resolveConfig!: () => void;
    let resolveTheme!: () => void;
    const configReady = new Promise<void>(resolve => { resolveConfig = resolve; });
    const themeReady = new Promise<void>(resolve => { resolveTheme = resolve; });
    const theme = { initTheme: vi.fn(() => themeReady) };
    const createTheme = vi.fn(() => theme);
    TestBed.configureTestingModule({
      providers: [
        { provide: ContentService, useValue: { loadConfig: () => configReady } },
        { provide: ComponentService, useValue: { registerDynamicComponent: vi.fn() } },
        { provide: ThemeService, useFactory: createTheme },
      ],
    });
    const initializer = TestBed.runInInjectionContext(() => initApp({}));
    const ready = vi.fn();
    const pending = initializer().then(ready);
    expect(createTheme).not.toHaveBeenCalled();
    expect(theme.initTheme).not.toHaveBeenCalled();
    resolveConfig();
    await configReady;
    expect(theme.initTheme).toHaveBeenCalledOnce();
    expect(ready).not.toHaveBeenCalled();
    resolveTheme();
    await pending;
    expect(ready).toHaveBeenCalledOnce();
  });
});

describe('mediaAssetsFactory', () => {
  const response = (currentPage: number) => ({
    rows: [{ id: '1', uuid: 'media-1', source: '/image.svg', thumb: '/thumb.png', title: 'A%20B' }],
    pager: { current_page: currentPage, total_pages: 3, total_items: 3, items_per_page: 1 },
  });

  const setup = () => {
    const node = {
      getApiParams: vi.fn(() => ''),
      fetch: vi.fn(),
      handlePager: vi.fn((pager: ReturnType<typeof response>['pager']) => ({
        currentPage: pager.current_page,
        totalPages: pager.total_pages,
        totalItems: pager.total_items,
        itemsPerPage: pager.items_per_page,
      })),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: NodeService, useValue: node },
        { provide: UserService, useValue: { localUserKey: 'user' } },
        { provide: CookieService, useValue: { check: () => true } },
      ],
    });
    const assets = TestBed.runInInjectionContext(mediaAssetsFactory);
    const requests = TestBed.inject(ContentState).mediaAssetsFormChange$;
    return { node, assets, requests };
  };

  it('cancels obsolete queries and normalizes only the latest media page', () => {
    const { node, assets, requests } = setup();
    const oldPage = new Subject<ReturnType<typeof response>>();
    const newPage = new Subject<ReturnType<typeof response>>();
    node.fetch.mockReturnValueOnce(oldPage).mockReturnValueOnce(newPage);
    requests.next({ page: 2 });
    expect(assets()).toBe(true);
    requests.next({ page: 0, name: 'new' });
    expect(oldPage.observed).toBe(false);
    oldPage.next(response(2));
    expect(assets()).toBe(true);
    newPage.next(response(0));

    expect(assets()).toMatchObject({
      rows: [{ src: '/image.svg', title: 'A B' }],
      pager: { currentPage: 0, totalPages: 3 },
    });
    expect(node.getApiParams).toHaveBeenLastCalledWith({ page: 0, name: 'new', noCache: true });
  });

  it('reports a failure without terminating subsequent page requests', () => {
    const { node, assets, requests } = setup();
    const failed = new Subject<ReturnType<typeof response>>();
    const retry = new Subject<ReturnType<typeof response>>();
    node.fetch.mockReturnValueOnce(failed).mockReturnValueOnce(retry);
    requests.next({ page: 1 });
    failed.error(new Error('Offline'));
    expect(assets()).toBe(false);

    requests.next({ page: 1 });
    expect(assets()).toBe(true);
    retry.next(response(1));
    expect(assets()).toMatchObject({ pager: { currentPage: 1 } });
  });

  it('cancels the active HTTP subscription when its injector is destroyed', () => {
    const { node, requests } = setup();
    const pending = new Subject<ReturnType<typeof response>>();
    node.fetch.mockReturnValue(pending);
    requests.next({ page: 0 });
    expect(pending.observed).toBe(true);
    TestBed.resetTestingModule();
    expect(pending.observed).toBe(false);
  });
});

describe('themeFactory', () => {
  afterEach(() => TestBed.resetTestingModule());

  const resolve = (config: Partial<ICoreConfig>, stored: unknown = null) => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useValue: { retrieve: () => stored } }],
    });
    return TestBed.runInInjectionContext(() => themeFactory(config as ICoreConfig));
  };

  it.each([undefined, '', 'blue-theme'])('uses light-theme for an invalid default: %s', value => {
    expect(resolve({ defaultTheme: value })).toBe('light-theme');
  });

  it('uses the configured supported default', () => {
    expect(resolve({ defaultTheme: 'dark-theme' })).toBe('dark-theme');
  });

  it('honours a supported local preference when the menu config is absent', () => {
    expect(resolve({}, 'dark-theme')).toBe('dark-theme');
  });

  it('rejects obsolete names even if a stale menu still lists them', () => {
    expect(resolve({ theme: [{ name: 'Blue', style: 'blue-theme' }] }, 'blue-theme'))
      .toBe('light-theme');
  });

  it('falls back when the configured menu no longer offers the local preference', () => {
    expect(resolve({
      defaultTheme: 'dark-theme',
      theme: [{ name: 'Dark', style: 'dark-theme' }],
    }, 'light-theme')).toBe('dark-theme');
  });
});

describe('builderCurrentPageFactory', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const setup = (url: string, pages: IPage[]) => {
    const version = signal<IPage[]>(pages);
    const checkIsLatestPage = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { url } },
        { provide: BuilderState, useValue: { version } },
        { provide: BuilderService, useValue: { checkIsLatestPage } },
      ],
    });

    const currentPage = TestBed.runInInjectionContext(() => builderCurrentPageFactory());
    return { currentPage, version, checkIsLatestPage };
  };

  it('returns the current page and follows version signal changes', () => {
    const { currentPage, version } = setup('/preview', [
      { title: 'A', body: [], current: true },
      { title: 'B', body: [] },
    ]);

    expect(currentPage()).toMatchObject({ title: 'A' });

    version.set([
      { title: 'A', body: [] },
      { title: 'B', body: [], current: true },
    ]);

    expect(currentPage()).toMatchObject({ title: 'B' });
  });

  it('falls back to the first page and to false when the list is empty', () => {
    const { currentPage, version } = setup('/preview', [{ title: 'A', body: [] }]);

    expect(currentPage()).toMatchObject({ title: 'A' });

    version.set([]);

    expect(currentPage()).toBe(false);
  });

  it('kicks off the latest-page check only on the builder path', () => {
    const pages: IPage[] = [{ title: 'A', body: [], current: true, nid: '1' }];

    const builderRun = setup('/builder', pages);
    expect(builderRun.checkIsLatestPage).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'A' })
    );

    TestBed.resetTestingModule();

    const previewRun = setup('/preview', pages);
    expect(previewRun.checkIsLatestPage).not.toHaveBeenCalled();
  });
});
