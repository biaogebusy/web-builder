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
    it.each(['browser', 'server'] as const)(
      'loads the published /404 page without replacing the document status on the %s', async platform => {
        setup({ platform });
        const first = firstValueFrom(service.loadPageContent('/about', false, true));
        http.expectOne(`${LANDING}?content=%2Fabout&public=true`).flush({
          title: 'Withdrawn title', publicPageKey: 'node:1:en:1',
          body: [{ type: 'text', body: 'Withdrawn body' }],
        });
        await first;

        const customPage = {
          title: 'Page not found',
          body: [{ type: 'text', classes: 'text-center', body: '<p>Return to the homepage</p>' }],
          meta: [{ name: 'description', content: 'Custom missing page' }],
          config: { headerMode: { transparent: false } },
        };
        const pending = firstValueFrom(service.loadPageContent('/about', true, true));
        const request = http.expectOne(`${LANDING}?content=%2Fabout&public=true`);
        expect(request.request.transferCache).toBe(false);
        expect(request.request.cache).toBe('no-store');
        request.flush({ body: [{ type: 'text', body: 'Legacy configured JSON is ignored' }] },
          { status: 404, statusText: 'Not Found' });
        const fallbackRequest = http.expectOne(`${LANDING}?content=%2F404&public=true`);
        expect(fallbackRequest.request.transferCache).toBe(false);
        expect(fallbackRequest.request.cache).toBe('no-store');
        fallbackRequest.flush({
          ...customPage, nid: '404', uuid: 'page-404', published: true,
          publicPageKey: 'node:404:en:1', unavailable: false,
        });
        const page = await pending;
        expect(page).toEqual({ ...customPage, unavailable: true });
        expect(tags.updateTags).toHaveBeenCalledWith(page);
        expect(service.getCachedPageContent('/about', true)).toBe(page);
        expect(requestContext.publicPageStatus).toBe(404);
        expect(requestContext.publicPage).toBeUndefined();

        const restored = firstValueFrom(service.loadPageContent('/about', false, true));
        http.expectOne(`${LANDING}?content=%2Fabout&public=true`).flush({
          title: 'Republished', body: [], publicPageKey: 'node:1:en:2',
        });
        await expect(restored).resolves.toMatchObject({ title: 'Republished' });
        expect(requestContext.publicPageStatus).toBe(200);
      }
    );

    it('uses the current language for /404 and accepts wrapped component inputs', async () => {
      const body = [{ content: { type: 'text', body: 'Custom 404 content' } }];
      const pending = firstValueFrom(service.loadPageContent('/en/about', true, true));
      http.expectOne(`/en${LANDING}?content=%2Fabout&public=true`)
        .flush({}, { status: 404, statusText: 'Not Found' });
      http.expectOne(`/en${LANDING}?content=%2F404&public=true`).flush({
        title: 404, body, meta: [null], config: 'invalid', publicPageKey: 'node:404:en:1',
      });
      await expect(pending).resolves.toEqual({ title: '', body, unavailable: true });
    });

    it.each([
      null, [], '<html>Proxy error</html>', {}, { body: [] }, { body: 'invalid' },
      { body: [null] }, { body: [{}] }, { body: [{ type: '' }] },
    ])('uses the default unavailable page for invalid 404 content: %j', async payload => {
      const pending = firstValueFrom(service.loadPageContent('/about', true, true));
      http.expectOne(`${LANDING}?content=%2Fabout&public=true`)
        .flush({}, { status: 404, statusText: 'Not Found' });
      http.expectOne(`${LANDING}?content=%2F404&public=true`).flush(
        payload && typeof payload === 'object' && !Array.isArray(payload)
          ? { ...payload, publicPageKey: 'node:404:en:1' } : payload
      );
      await expect(pending).resolves.toEqual({ title: '', body: [], unavailable: true });
      expect(requestContext.publicPageStatus).toBe(404);
    });

    it.each([403, 404, 503])('stops after /404 returns HTTP %i', async status => {
      const pending = firstValueFrom(service.loadPageContent('/about', false, true));
      http.expectOne(`${LANDING}?content=%2Fabout&public=true`)
        .flush({}, { status: 404, statusText: 'Not Found' });
      http.expectOne(`${LANDING}?content=%2F404&public=true`).flush({
        title: 'Unpublished 404', body: [{ type: 'text', body: 'Private 404 content' }],
      }, { status, statusText: 'Failure' });
      await expect(pending).resolves.toEqual({ title: '', body: [], unavailable: true });
      expect(requestContext.publicPageStatus).toBe(404);
      expect(requestContext.publicPage).toBeUndefined();
    });

    it.each(['/404', '/404/', '/en/404&preview=true'])(
      'does not request a missing /404 page again: %s', async path => {
        const pending = firstValueFrom(service.loadPageContent(path, false, true));
        http.expectOne(request => request.url.includes('content=%2F404'))
          .flush({}, { status: 404, statusText: 'Not Found' });
        await expect(pending).resolves.toEqual({ title: '', body: [], unavailable: true });
        expect(requestContext.publicPageStatus).toBe(404);
      }
    );

    it('does not accept a /404 response without publication verification', async () => {
      const pending = firstValueFrom(service.loadPageContent('/about', false, true));
      http.expectOne(`${LANDING}?content=%2Fabout&public=true`)
        .flush({}, { status: 404, statusText: 'Not Found' });
      http.expectOne(`${LANDING}?content=%2F404&public=true`).flush({
        title: 'Legacy draft', body: [{ type: 'text', body: 'Private 404 content' }],
      });
      await expect(pending).resolves.toEqual({ title: '', body: [], unavailable: true });
    });

    it.each([500, 503])('does not request /404 or display a body from HTTP %i', async status => {
      const pending = firstValueFrom(service.loadPageContent('/about', false, true));
      http.expectOne(`${LANDING}?content=%2Fabout&public=true`).flush({
        title: 'Unverified content', body: [{ type: 'text', body: 'Do not render' }],
      }, { status, statusText: 'Failure' });
      await expect(pending).resolves.toEqual({ title: '', body: [], unavailable: true });
      expect(requestContext.publicPageStatus).toBe(503);
    });

    it('does not expose a legacy response that lacks public publication verification', async () => {
      const pending = firstValueFrom(service.loadPageContent('/about', false, true));
      http.expectOne(`${LANDING}?content=%2Fabout&public=true`)
        .flush({ title: 'Privileged legacy draft', published: false, body: [{ type: 'text', body: 'Draft' }] });
      await expect(pending).resolves.toEqual({ title: '', body: [], unavailable: true });
      expect(requestContext.publicPageStatus).toBe(503);
    });

    it('rechecks public publication after a successful read and removes withdrawn content', async () => {
      const first = firstValueFrom(service.loadPageContent('/about', false, true));
      const request = http.expectOne(`${LANDING}?content=%2Fabout&public=true`);
      expect(request.request.transferCache).toBe(false);
      request.flush({ title: 'Published title', body: [], publicPageKey: 'node:1:en:1' });
      await first;

      const second = firstValueFrom(service.loadPageContent('/about', false, true));
      http.expectOne(`${LANDING}?content=%2Fabout&public=true`)
        .flush({}, { status: 404, statusText: 'Not Found' });
      http.expectOne(`${LANDING}?content=%2F404&public=true`)
        .flush({}, { status: 404, statusText: 'Not Found' });
      await expect(second).resolves.toMatchObject({ body: [], unavailable: true });
      expect(service.getCachedPageContent('/about', true)?.title).toBe('');
      expect(requestContext.publicPageStatus).toBe(404);
      expect(requestContext.publicPage).toBeUndefined();
    });

    it('keeps public and builder reads separate and prevents query overrides', async () => {
      const draft = firstValueFrom(service.loadPageContent('/about', false));
      http.expectOne(`${LANDING}?content=%2Fabout`).flush({ title: 'Draft', published: false });
      await draft;
      const publicRead = firstValueFrom(service.loadPageContent('/about&public=false', false, true));
      http.expectOne(`${LANDING}?content=%2Fabout&public=true`)
        .flush({}, { status: 404, statusText: 'Not Found' });
      http.expectOne(`${LANDING}?content=%2F404&public=true`)
        .flush({}, { status: 404, statusText: 'Not Found' });
      await expect(publicRead).resolves.toMatchObject({ unavailable: true });
      expect(service.getCachedPageContent('/about')?.title).toBe('Draft');
    });

    it('records public authority for SSR and fails closed on a later unavailable source', async () => {
      setup({ platform: 'server' });
      const first = firstValueFrom(service.loadPageContent('/about', false, true));
      http.expectOne(`${LANDING}?content=%2Fabout&public=true`)
        .flush({ body: [], publicPageKey: 'node:1:en:4' });
      await first;
      expect(requestContext.publicPage).toEqual({ url: `${LANDING}?content=%2Fabout&public=true`, key: 'node:1:en:4' });
      const second = firstValueFrom(service.loadPageContent('/about', false, true));
      http.expectOne(`${LANDING}?content=%2Fabout&public=true`)
        .flush({}, { status: 503, statusText: 'Unavailable' });
      await expect(second).resolves.toMatchObject({ unavailable: true });
      expect(requestContext.publicPageStatus).toBe(503);
      expect(requestContext.publicPage).toBeUndefined();
    });

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

  describe.each(['branding', 'config'] as const)('%s failure recovery', kind => {
    const endpoint = `${LANDING}?content=%2Fcore%2F${kind === 'branding' ? 'branding' : 'base'}`;
    const recovered = kind === 'branding' ? { header: [] } : { animate: true };
    const read = (path = '/about') => {
      if (kind === 'branding') return lastValueFrom(service.loadBranding(path));
      const config = {};
      return service.loadConfig(config, path).then(() => config);
    };
    const fail = async (status: number) => {
      for (let attempt = 0; attempt <= (kind === 'branding' ? 1 : 2); attempt++) {
        if (attempt) await vi.advanceTimersByTimeAsync(kind === 'branding' ? 500 : 1000);
        const request = http.expectOne(endpoint);
        if (status === 0) request.error(new ProgressEvent('error'));
        else request.flush('Unavailable', { status, statusText: 'Unavailable' });
      }
    };

    beforeEach(() => {
      vi.useFakeTimers();
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
    });
    afterEach(() => vi.useRealTimers());

    it.each([0, 503])('shares failures and recovers the same language after HTTP %i', async status => {
      const first = read();
      const concurrent = read();
      await fail(status);
      expect(await Promise.all([first, concurrent])).toEqual([{}, {}]);

      const english = read('/en/about');
      http.expectOne(`/en${endpoint}`).flush(recovered);
      await english;
      const retry = read();
      const sharedRetry = read();
      http.expectOne(endpoint).flush(recovered);
      expect(await Promise.all([retry, sharedRetry])).toEqual([recovered, recovered]);
      expect(await read()).toEqual(recovered);
      expect(await read('/en/about')).toEqual(recovered);
      http.expectNone(() => true);
    });

    it.each([403, 404])('keeps the existing stable HTTP %i fallback cached', async status => {
      const first = read();
      await fail(status);
      expect(await first).toEqual({});
      expect(await read()).toEqual({});
      http.expectNone(endpoint);
    });

    it('keeps one degraded SSR read without adding another render request', async () => {
      setup({ platform: 'server' });
      const first = read();
      http.expectOne(endpoint).flush('Unavailable', { status: 503, statusText: 'Unavailable' });
      expect(await first).toEqual({});
      expect(requestContext.degraded).toBe(true);
      expect(await read()).toEqual({});
      http.expectNone(endpoint);
    });
  });

  it('recovers branding on the next read after both attempts time out', async () => {
    vi.useFakeTimers();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const endpoint = `${LANDING}?content=%2Fcore%2Fbranding`;
      const first = lastValueFrom(service.loadBranding());
      const attempt = http.expectOne(endpoint);
      await vi.advanceTimersByTimeAsync(5000);
      expect(attempt.cancelled).toBe(true);
      await vi.advanceTimersByTimeAsync(500);
      const retried = http.expectOne(endpoint);
      await vi.advanceTimersByTimeAsync(5000);
      expect(retried.cancelled).toBe(true);
      expect(await first).toEqual({});
      const recovered = lastValueFrom(service.loadBranding());
      http.expectOne(endpoint).flush({ header: [] });
      expect(await recovered).toEqual({ header: [] });
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not replace the active configuration with a late language response', async () => {
    const config = {};
    const previous = service.loadConfig(config, '/en/about');
    const current = service.loadConfig(config, '/about');
    http.expectOne(`${LANDING}?content=%2Fcore%2Fbase`).flush({ animate: true });
    await current;
    http.expectOne(`/en${LANDING}?content=%2Fcore%2Fbase`).flush({ animate: false });
    await previous;
    expect(config).toEqual({ animate: true });
  });

  describe('loadUIUX', () => {
    it.each([0, 503])('recovers a captured feed after HTTP %i for new and existing readers', status => {
      const feed = service.loadUIUX();
      const existing = vi.fn();
      const first = feed.subscribe(existing);
      const failed = http.expectOne('/api/v3/node/component');
      if (status === 0) failed.error(new ProgressEvent('error'));
      else failed.flush('Unavailable', { status, statusText: 'Unavailable' });
      expect(existing).toHaveBeenLastCalledWith([]);
      http.expectNone('/api/v3/node/component');

      const reopened = vi.fn();
      const second = feed.subscribe(reopened);
      const concurrent = feed.subscribe();
      try {
        const recovery = http.expectOne('/api/v3/node/component');
        concurrent.unsubscribe();
        expect(recovery.cancelled).toBe(false);
        recovery.flush([{ id: 2 }]);
        expect(existing).toHaveBeenLastCalledWith([{ id: 2 }]);
        expect(reopened).toHaveBeenLastCalledWith([{ id: 2 }]);
        const cached = vi.fn();
        feed.subscribe(cached).unsubscribe();
        expect(cached).toHaveBeenLastCalledWith([{ id: 2 }]);
        http.expectNone('/api/v3/node/component');
      } finally {
        first.unsubscribe();
        second.unsubscribe();
        concurrent.unsubscribe();
      }
    });

    it.each([200, 403, 404])('keeps an empty HTTP %i result until explicit refresh', status => {
      const feed = service.loadUIUX();
      const first = feed.subscribe();
      http.expectOne('/api/v3/node/component').flush([], { status, statusText: 'Response' });
      first.unsubscribe();
      const values = vi.fn();
      const reopened = feed.subscribe(values);
      try {
        expect(values).toHaveBeenLastCalledWith([]);
        http.expectNone('/api/v3/node/component');
        service.reloadUIUX();
        http.expectOne('/api/v3/node/component').flush([{ id: 3 }]);
        expect(values).toHaveBeenLastCalledWith([{ id: 3 }]);
      } finally {
        reopened.unsubscribe();
      }
    });

    it('recovers a failed refresh without splitting the shared stream or retrying in the background', () => {
      const feed = service.loadUIUX();
      const values = vi.fn();
      const existing = feed.subscribe(values);
      http.expectOne('/api/v3/node/component').flush([{ id: 1 }]);
      service.reloadUIUX();
      http.expectOne('/api/v3/node/component')
        .flush('Unavailable', { status: 503, statusText: 'Unavailable' });
      expect(values).toHaveBeenLastCalledWith([]);
      http.expectNone('/api/v3/node/component');
      const reopened = feed.subscribe();
      try {
        http.expectOne('/api/v3/node/component')
          .flush('Unavailable', { status: 503, statusText: 'Unavailable' });
        http.expectNone('/api/v3/node/component');
        service.reloadUIUX();
        http.expectOne('/api/v3/node/component').flush([{ id: 4 }]);
        expect(values).toHaveBeenLastCalledWith([{ id: 4 }]);
        feed.subscribe().unsubscribe();
        http.expectNone('/api/v3/node/component');
      } finally {
        existing.unsubscribe();
        reopened.unsubscribe();
      }
    });

    it('keeps a failed SSR read shared within the same render', () => {
      setup({ platform: 'server' });
      const feed = service.loadUIUX();
      const first = feed.subscribe();
      http.expectOne('/api/v3/node/component')
        .flush('Unavailable', { status: 503, statusText: 'Unavailable' });
      first.unsubscribe();
      const values = vi.fn();
      feed.subscribe(values).unsubscribe();
      expect(values).toHaveBeenLastCalledWith([]);
      http.expectNone('/api/v3/node/component');
    });

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
