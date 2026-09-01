import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DOCUMENT, PLATFORM_ID, REQUEST_CONTEXT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { IPage } from '@core/interface/IAppConfig';
import { ApiService } from '@core/service/api.service';
import { ContentService } from '@core/service/content.service';
import type { SsrRequestContext } from '@core/service/ssr-render-state.service';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { createScreenStateMock } from '@core/testing/mocks';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { firstValueFrom, lastValueFrom } from 'rxjs';

const createTagsMock = () => ({ updateTags: vi.fn() });

describe('ContentService', () => {
  let service: ContentService;
  let http: HttpTestingController;
  let tags: ReturnType<typeof createTagsMock>;
  let screenState: ReturnType<typeof createScreenStateMock>;
  let requestContext: SsrRequestContext;

  const LANDING = '/api/v3/landingPage';

  const setup = (
    options: {
      platform?: 'browser' | 'server';
      pathname?: string;
      search?: string;
      coreConfig?: Record<string, unknown>;
    } = {}
  ) => {
    const { platform = 'browser', pathname = '/about', search = '', coreConfig = {} } = options;
    tags = createTagsMock();
    requestContext = {};
    screenState = createScreenStateMock();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: '' },
        { provide: CORE_CONFIG, useValue: coreConfig },
        { provide: PLATFORM_ID, useValue: platform },
        { provide: REQUEST_CONTEXT, useValue: requestContext },
        { provide: TagsService, useValue: tags },
        { provide: ScreenState, useValue: screenState },
        {
          provide: DOCUMENT,
          useValue: {
            location: { pathname, search, origin: 'http://localhost' },
            getElementsByTagName: (tag: string) => document.getElementsByTagName(tag),
          },
        },
      ],
    });
    service = TestBed.inject(ContentService);
    http = TestBed.inject(HttpTestingController);
  };

  beforeEach(() => setup());

  afterEach(() => {
    http.verify();
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('loadPageContent', () => {
    it('requests the landing page endpoint for the current path', async () => {
      const pending = firstValueFrom(service.loadPageContent());

      const req = http.expectOne(`${LANDING}?content=%2Fabout`);
      req.flush({ title: '关于' });

      await expect(pending).resolves.toEqual({ title: '关于' });
    });

    it('keeps the language prefix out of the content param', async () => {
      const pending = firstValueFrom(service.loadPageContent('/en/about'));

      http.expectOne(`/en${LANDING}?content=%2Fabout`).flush({ title: 'About' });

      await pending;
    });

    it('updates tags and scroll state by default', async () => {
      const pending = firstValueFrom(service.loadPageContent());
      http.expectOne(`${LANDING}?content=%2Fabout`).flush({ title: '关于' });
      await pending;

      expect(tags.updateTags).toHaveBeenCalledWith({ title: '关于' });
      expect(screenState.scroll$.value).toBe(true);
    });

    it('skips the state update when asked to', async () => {
      const pending = firstValueFrom(service.loadPageContent('/about', false));
      http.expectOne(`${LANDING}?content=%2Fabout`).flush({ title: '关于' });
      await pending;

      expect(tags.updateTags).not.toHaveBeenCalled();
    });

    it('serves repeated requests from the cache', async () => {
      const first = firstValueFrom(service.loadPageContent());
      http.expectOne(`${LANDING}?content=%2Fabout`).flush({ title: '关于' });
      await first;

      await expect(firstValueFrom(service.loadPageContent())).resolves.toEqual({ title: '关于' });
      http.expectNone(`${LANDING}?content=%2Fabout`);
    });

    it('degrades to an empty page once the retry is exhausted', async () => {
      vi.useFakeTimers();
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const pending = firstValueFrom(service.loadPageContent());

      const fail = () =>
        http
          .expectOne(`${LANDING}?content=%2Fabout`)
          .flush('nope', { status: 404, statusText: 'Not Found' });
      fail();
      await vi.advanceTimersByTimeAsync(500);
      fail();

      await expect(pending).resolves.toEqual({});
      vi.useRealTimers();
    });

    it('retries once in the browser', async () => {
      vi.useFakeTimers();
      const pending = firstValueFrom(service.loadPageContent());

      http
        .expectOne(`${LANDING}?content=%2Fabout`)
        .flush('boom', { status: 500, statusText: 'Server Error' });
      await vi.advanceTimersByTimeAsync(500);
      http.expectOne(`${LANDING}?content=%2Fabout`).flush({ title: '关于' });

      await expect(pending).resolves.toEqual({ title: '关于' });
      vi.useRealTimers();
    });

    it('does not retry on the server and flags the render as degraded', async () => {
      setup({ platform: 'server' });
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const pending = firstValueFrom(service.loadPageContent());

      // A 5xx is transient: the SSR HTML must not be cached
      http
        .expectOne(`${LANDING}?content=%2Fabout`)
        .flush('boom', { status: 500, statusText: 'Server Error' });

      await expect(pending).resolves.toEqual({});
      expect(requestContext.degraded).toBe(true);
      expect(requestContext.degradedReasons).toEqual(['page-content']);
    });

    it('keeps a stable 404 cacheable under SSR', async () => {
      setup({ platform: 'server' });
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const pending = firstValueFrom(service.loadPageContent());

      http
        .expectOne(`${LANDING}?content=%2Fabout`)
        .flush('nope', { status: 404, statusText: 'Not Found' });

      await pending;
      expect(requestContext.degraded).toBeUndefined();
    });

    it('exposes the last resolved page synchronously', async () => {
      expect(service.getCachedPageContent('/about')).toBeUndefined();

      const pending = firstValueFrom(service.loadPageContent());
      http.expectOne(`${LANDING}?content=%2Fabout`).flush({ title: '关于' });
      await pending;

      expect(service.getCachedPageContent('/about')).toEqual({ title: '关于' });
    });

    it('carries whitelisted query params into the request', async () => {
      setup({ pathname: '/about', search: '?preview=1' });
      const pending = firstValueFrom(service.loadPageContent());

      http.expectOne(`${LANDING}?content=%2Fabout&preview=1`).flush({ title: '预览' });

      await pending;
    });
  });

  it('ignores array payloads when updating the page state', () => {
    service.updatePage([] as unknown as IPage);

    expect(tags.updateTags).not.toHaveBeenCalled();
  });

  describe('loadBranding', () => {
    it('caches the branding request per language', async () => {
      const first = firstValueFrom(service.loadBranding());
      http.expectOne(`${LANDING}?content=%2Fcore%2Fbranding`).flush({ header: [] });
      await first;

      await expect(firstValueFrom(service.loadBranding())).resolves.toEqual({ header: [] });
      http.expectNone(`${LANDING}?content=%2Fcore%2Fbranding`);
    });

    it('falls back to empty branding once the retry is exhausted', async () => {
      vi.useFakeTimers();
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const pending = firstValueFrom(service.loadBranding());

      const fail = () =>
        http
          .expectOne(`${LANDING}?content=%2Fcore%2Fbranding`)
          .flush('boom', { status: 404, statusText: 'Not Found' });
      fail();
      await vi.advanceTimersByTimeAsync(500);
      fail();

      await expect(pending).resolves.toEqual({});
      vi.useRealTimers();
    });
  });

  describe('loadConfig', () => {
    it('replaces the config object in place and signals the app', async () => {
      const coreConfig: Record<string, unknown> = { stale: true };
      const done = vi.fn();
      TestBed.inject(ApiService).configLoadDone$.subscribe(done);

      const pending = service.loadConfig(coreConfig);
      http.expectOne(`${LANDING}?content=%2Fcore%2Fbase`).flush({ animate: true });
      await pending;

      // Same reference, new content: consumers holding the object see the update
      expect(coreConfig).toEqual({ animate: true });
      expect(done).toHaveBeenCalledWith(true);
    });

    it('still signals the app when the config request fails', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const coreConfig: Record<string, unknown> = {};
      const done = vi.fn();
      TestBed.inject(ApiService).configLoadDone$.subscribe(done);

      vi.useFakeTimers();
      const pending = service.loadConfig(coreConfig);
      const fail = () =>
        http
          .expectOne(`${LANDING}?content=%2Fcore%2Fbase`)
          .flush('boom', { status: 404, statusText: 'Not Found' });
      // Two retries with a 1s delay before the fallback kicks in
      fail();
      await vi.advanceTimersByTimeAsync(1000);
      fail();
      await vi.advanceTimersByTimeAsync(1000);
      fail();
      await pending;
      vi.useRealTimers();

      expect(coreConfig).toEqual({});
      expect(done).toHaveBeenCalledWith(true);
    });
  });

  describe('loadUIUX', () => {
    it('shares one request across subscribers and refreshes on demand', async () => {
      const first = firstValueFrom(service.loadUIUX());
      http.expectOne('/api/v3/node/component').flush([{ id: 1 }]);
      await first;

      http.expectNone('/api/v3/node/component');

      const refreshed = firstValueFrom(service.loadUIUX());
      service.reloadUIUX();
      http.expectOne('/api/v3/node/component').flush([{ id: 2 }]);

      await expect(refreshed).resolves.toEqual([{ id: 1 }]);
      await expect(firstValueFrom(service.loadUIUX())).resolves.toEqual([{ id: 2 }]);
    });

    it('falls back to an empty component list on failure', async () => {
      const pending = firstValueFrom(service.loadUIUX());

      http
        .expectOne('/api/v3/node/component')
        .flush('boom', { status: 500, statusText: 'Server Error' });

      await expect(pending).resolves.toEqual([]);
    });
  });

  describe('loadJSON', () => {
    it('requests the landing page endpoint with nocache', async () => {
      const pending = firstValueFrom(service.loadJSON('/core/builder'));

      http.expectOne(`${LANDING}?content=%2Fcore%2Fbuilder&nocache=true`).flush({ ok: true });

      await pending;
    });

    it('caches the builder config', async () => {
      const first = firstValueFrom(service.loadBuilderConfig());
      http.expectOne(`${LANDING}?content=%2Fcore%2Fbuilder&nocache=true`).flush({ ok: true });
      await first;

      await expect(firstValueFrom(service.loadBuilderConfig())).resolves.toEqual({ ok: true });
      http.expectNone(`${LANDING}?content=%2Fcore%2Fbuilder&nocache=true`);
    });
  });

  describe('logContent', () => {
    it('does nothing when content logging is off', () => {
      service.logContent('/about');

      http.expectNone(() => true);
    });

    it('posts the location to the configured log api', () => {
      setup({ coreConfig: { log: { content: { enabel: true, api: '/api/v3/log' } } } });

      service.logContent('/about');

      http.expectOne('/api/v3/log?location=%2Fabout').flush({});
    });
  });

  describe('getRepository', () => {
    it('returns the repository payload', async () => {
      const pending = lastValueFrom(service.getRepository('acme', 'repo', 'token'));

      const req = http.expectOne('https://api.github.com/repos/acme/repo');
      expect(req.request.headers.get('Authorization')).toBe('Bearer token');
      req.flush({ html_url: 'https://github.com/acme/repo', stargazers_count: 42 });

      await expect(pending).resolves.toEqual({
        html_url: 'https://github.com/acme/repo',
        stargazers_count: 42,
      });
    });

    it('degrades to an empty repository on failure', async () => {
      const pending = lastValueFrom(service.getRepository('acme', 'repo', 'token'));

      http
        .expectOne('https://api.github.com/repos/acme/repo')
        .flush('boom', { status: 403, statusText: 'Forbidden' });

      await expect(pending).resolves.toEqual({ html_url: '', stargazers_count: 0 });
    });
  });
});
