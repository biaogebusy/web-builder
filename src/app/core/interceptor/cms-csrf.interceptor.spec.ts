import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '@core/token/token-providers';
import { UserService } from '@core/service/user.service';
import { firstValueFrom } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { cmsCsrfInterceptor } from './cms-csrf.interceptor';
import { cmsWriteContext } from '@core/config/cms-http-context';

const APP = 'https://app.example.test';
const CMS = 'https://cms.example.test';
const WRITE = '/api/v3/landingPage/update/42';
const TOKEN = 't'.repeat(43);

describe('cmsCsrfInterceptor with OAuth authentication', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  function setup(options: { apiUrl?: string; platform?: string; bearer?: boolean } = {}) {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor, cmsCsrfInterceptor])),
        provideHttpClientTesting(),
        { provide: DOCUMENT, useValue: { location: { origin: APP }, baseURI: `${APP}/`, cookie: '' } },
        { provide: PLATFORM_ID, useValue: options.platform ?? 'browser' },
        { provide: API_URL, useValue: options.apiUrl ?? APP },
        {
          provide: UserService,
          useValue: {
            isBrowser: options.platform !== 'server',
            getStoredUser: () => options.bearer === false ? null : {
              access_token: 'fixture-bearer', expires_at: Date.now() + 60_000,
            },
          },
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  }

  afterEach(() => {
    try {
      controller.verify();
    } finally {
      TestBed.resetTestingModule();
    }
  });

  it.each([
    ['POST', '/api/v3/landingPage/builder'],
    ['PATCH', WRITE],
    ['POST', '/api/v3/landingPage/alias/42'],
    ['POST', '/api/v3/landingPage/translations/add/42/zh-hans/en'],
    ['POST', '/api/v3/landingPage/translations/delete/42/en'],
    ['POST', '/api/v3/node/translations/add/42/zh-hans/en'],
    ['POST', '/api/v3/landingPage/drafts/fixture/change'],
    ['POST', '/api/v3/extension/action'],
  ])('pairs %s %s with its session token when Cookie use is explicit', (method, url) => {
    setup();
    const body = { uuid: 'shared-component', body: [] };
    http.request(method, url, {
      body, withCredentials: true, context: cmsWriteContext(),
    }).subscribe();
    controller.expectNone(url);
    const token = controller.expectOne(`${APP}/session/token`);
    expect(token.request.method).toBe('GET');
    expect(token.request.headers.get('Accept')).toBe('text/plain');
    expect(token.request.headers.has('Authorization')).toBe(false);
    expect(token.request.cache).toBe('no-store');
    expect(token.request.redirect).toBe('error');
    expect(token.request.transferCache).toBe(false);
    token.flush(TOKEN);
    const write = controller.expectOne(url);
    expect(write.request.method).toBe(method);
    expect(write.request.body).toBe(body);
    expect(write.request.headers.get('Authorization')).toBe('Bearer fixture-bearer');
    expect(write.request.headers.get('X-CSRF-Token')).toBe(TOKEN);
    write.flush({});
  });

  it.each([
    [APP, WRITE],
    [APP, `${APP}${WRITE}`],
    [APP, `${APP}/en${WRITE}?preview=1`],
    [CMS, WRITE],
    [CMS, `${CMS}${WRITE}`],
    [`${CMS}/cms/`, `${CMS}/cms/zh-hans${WRITE}`],
    [APP, '/api/v3/extension/action'],
  ])('sends Bearer writes without cookies or a token fetch: %s, %s', (apiUrl, url) => {
    setup({ apiUrl });
    const body = { uuid: 'shared-component', body: [] };
    http.patch(url, body).subscribe();
    const write = controller.expectOne(url);
    expect(write.request.headers.get('Authorization')).toBe('Bearer fixture-bearer');
    expect(write.request.headers.has('X-CSRF-Token')).toBe(false);
    expect(write.request.credentials).toBe('omit');
    expect(write.request.withCredentials).toBe(false);
    expect(write.request.body).toBe(body);
    write.flush({});
  });

  it('recognizes an explicitly supplied Bearer token case-insensitively', () => {
    setup({ bearer: false });
    http.patch(WRITE, {}, { headers: { Authorization: 'bearer caller-token' } }).subscribe();
    const write = controller.expectOne(WRITE);
    expect(write.request.headers.get('Authorization')).toBe('bearer caller-token');
    expect(write.request.credentials).toBe('omit');
    write.flush({});
  });

  it('retains CSRF protection for other authentication schemes', () => {
    setup({ bearer: false });
    http.patch(WRITE, {}, {
      headers: { Authorization: 'Basic fixture' }, context: cmsWriteContext(),
    }).subscribe();
    controller.expectOne(`${APP}/session/token`).flush(TOKEN);
    const write = controller.expectOne(WRITE);
    expect(write.request.headers.get('Authorization')).toBe('Basic fixture');
    expect(write.request.headers.get('X-CSRF-Token')).toBe(TOKEN);
    expect(write.request.credentials).toBeUndefined();
    write.flush({});
  });

  it('respects explicitly requested same-origin cookies even with Bearer', () => {
    setup();
    http.patch(WRITE, {}, { credentials: 'same-origin', context: cmsWriteContext() }).subscribe();
    const token = controller.expectOne(`${APP}/session/token`);
    expect(token.request.credentials).toBe('same-origin');
    token.flush(TOKEN);
    const write = controller.expectOne(WRITE);
    expect(write.request.credentials).toBe('same-origin');
    expect(write.request.headers.get('X-CSRF-Token')).toBe(TOKEN);
    write.flush({});
  });

  it('supports cookie-only callers and language-prefixed absolute URLs', () => {
    setup({ bearer: false });
    const url = `${APP}/en${WRITE}?preview=1`;
    http.patch(url, {}, { context: cmsWriteContext() }).subscribe();
    controller.expectOne(`${APP}/session/token`).flush(TOKEN);
    const write = controller.expectOne(url);
    expect(write.request.headers.has('Authorization')).toBe(false);
    expect(write.request.headers.get('X-CSRF-Token')).toBe(TOKEN);
    write.flush({});
  });

  it.each(['GET', 'HEAD', 'OPTIONS', 'TRACE'])('does not fetch tokens for %s', method => {
    setup();
    http.request(method, WRITE).subscribe();
    const read = controller.expectOne(WRITE);
    expect(read.request.credentials).toBe('omit');
    read.flush(null);
  });

  it.each(['/oauth/token', '/api/v3/otp/login', '/api/v3/session/logout', '/api/v3/unrelated'])('leaves unrelated paths alone: %s', url => {
      setup();
      http.post(url, {}, { withCredentials: true }).subscribe();
      const request = controller.expectOne(url);
      expect(request.request.withCredentials).toBe(true);
      expect(request.request.credentials).toBeUndefined();
      request.flush({});
    });

  it('keeps an explicitly supplied CSRF token', () => {
    setup();
    http.patch(WRITE, {}, { headers: { 'X-CSRF-Token': 'caller-token' } }).subscribe();
    const write = controller.expectOne(WRITE);
    expect(write.request.headers.get('X-CSRF-Token')).toBe('caller-token');
    expect(write.request.credentials).toBeUndefined();
    write.flush({});
  });

  it('does not fetch browser session tokens during SSR', () => {
    setup({ platform: 'server' });
    http.patch(WRITE, {}, { context: cmsWriteContext() }).subscribe();
    controller.expectOne(WRITE).flush({});
  });

  it.each([`${CMS}.evil.test${WRITE}`, `https://other.test${WRITE}`, `//other.test${WRITE}`])('never requests or attaches a CSRF token for another origin: %s', url => {
      setup({ apiUrl: CMS });
      http.patch(url, {}, { withCredentials: true, context: cmsWriteContext() }).subscribe();
      const write = controller.expectOne(url);
      expect(write.request.headers.has('X-CSRF-Token')).toBe(false);
      write.flush({});
    });

  it('uses the configured CMS subdirectory and matches cross-origin cookie credentials', () => {
    setup({ apiUrl: `${CMS}/cms/` });
    const url = `${CMS}/cms/zh-hans${WRITE}`;
    http.patch(url, {}, { withCredentials: true, context: cmsWriteContext() }).subscribe();
    const token = controller.expectOne(`${CMS}/cms/session/token`);
    expect(token.request.withCredentials).toBe(true);
    expect(token.request.credentials).toBeUndefined();
    token.flush(TOKEN);
    const write = controller.expectOne(url);
    expect(write.request.withCredentials).toBe(true);
    expect(write.request.headers.get('X-CSRF-Token')).toBe(TOKEN);
    write.flush({});
  });

  it('supports Fetch credentials include without withCredentials', () => {
    setup({ apiUrl: CMS });
    http.patch(`${CMS}${WRITE}`, {}, {
      credentials: 'include', context: cmsWriteContext(),
    }).subscribe();
    const token = controller.expectOne(`${CMS}/session/token`);
    expect(token.request.credentials).toBe('include');
    token.flush(TOKEN);
    controller.expectOne(`${CMS}${WRITE}`).flush({});
  });

  it('supports the relative frontend proxy when API_URL points to a different origin', () => {
    setup({ apiUrl: CMS, bearer: false });
    http.patch(WRITE, {}, { context: cmsWriteContext() }).subscribe();
    controller.expectOne(`${APP}/session/token`).flush(TOKEN);
    controller.expectOne(WRITE).flush({});
  });

  it('preserves pure cross-origin Bearer requests without session cookies', () => {
    setup({ apiUrl: CMS });
    http.patch(`${CMS}${WRITE}`, {}).subscribe();
    const write = controller.expectOne(`${CMS}${WRITE}`);
    expect(write.request.headers.get('Authorization')).toBe('Bearer fixture-bearer');
    expect(write.request.headers.has('X-CSRF-Token')).toBe(false);
    write.flush({});
  });

  it('skips explicitly omitted credentials', () => {
    setup();
    http.patch(WRITE, {}, { credentials: 'omit' }).subscribe();
    controller.expectOne(WRITE).flush({});
  });

  for (const version of [1, 2, 3]) {
    it.each(['GET', 'POST', 'PATCH', 'DELETE'])(
      `isolates Bearer credentials for an unregistered v${version} %s`, method => {
        setup();
        const url = `${APP}/zh-hans/api/v${version}/future-resource`;
        http.request(method, url).subscribe();
        const request = controller.expectOne(url);
        expect(request.request.credentials).toBe('omit');
        expect(request.request.headers.get('Authorization')).toBe('Bearer fixture-bearer');
        expect(request.request.headers.has('X-CSRF-Token')).toBe(false);
        request.flush({});
      }
    );
  }

  it.each([
    ['POST', '/api/v1/node/future_bundle'],
    ['PATCH', '/en/api/v1/node/future_bundle/fixture-id'],
    ['DELETE', '/api/v1/node/future_bundle/fixture-id'],
    ['POST', '/api/v1/node/future_bundle/fixture-id/relationships/related'],
    ['POST', '/api/v1/media/future_media/file_field'],
    ['POST', '/api/v1/file/file'],
  ])('protects JSON:API without registering resource names: %s %s', (method, url) => {
    setup({ bearer: false });
    const body = { data: { title: 'Fixture' } };
    http.request(method, url, { body }).subscribe();
    const token = controller.expectOne(`${APP}/session/token`);
    expect(token.request.credentials).toBe('same-origin');
    token.flush(TOKEN);
    const write = controller.expectOne(url);
    expect(write.request.headers.get('X-CSRF-Token')).toBe(TOKEN);
    expect(write.request.body).toBe(body);
    write.flush({});
  });

  it.each(['/api/v2/view-fixture', '/api/v3/readonly-query'])(
    'does not fetch tokens for an undeclared Cookie POST %s', url => {
      setup({ bearer: false });
      http.post(url, {}, { withCredentials: true }).subscribe();
      const read = controller.expectOne(url);
      expect(read.request.headers.has('X-CSRF-Token')).toBe(false);
      read.flush({});
    }
  );

  it.each([
    '/chat/run', '/api/v10/fixture', '/api/v1-suffix/fixture',
    '/assets/api/v1/fixture', '/file?path=/api/v1/node/fixture',
  ])('does not apply CMS policy outside API boundaries: %s', url => {
    setup();
    http.post(url, {}, { context: cmsWriteContext() }).subscribe();
    const request = controller.expectOne(url);
    expect(request.request.credentials).toBeUndefined();
    expect(request.request.headers.has('X-CSRF-Token')).toBe(false);
    request.flush({});
  });

  it('keeps withCredentials precedence over Fetch credentials', () => {
    setup();
    const url = '/api/v1/node/fixture';
    http.post(url, {}, { withCredentials: true, credentials: 'omit' }).subscribe();
    const token = controller.expectOne(`${APP}/session/token`);
    expect(token.request.withCredentials).toBe(true);
    expect(token.request.credentials).toBeUndefined();
    token.flush(TOKEN);
    const write = controller.expectOne(url);
    expect(write.request.withCredentials).toBe(true);
    write.flush({});
  });

  it('keeps concurrent token responses bound to their original writes', () => {
    setup({ bearer: false });
    http.post(WRITE, { id: 1 }, { context: cmsWriteContext() }).subscribe();
    http.post(WRITE, { id: 2 }, { context: cmsWriteContext() }).subscribe();
    const tokens = controller.match(`${APP}/session/token`);
    expect(tokens).toHaveLength(2);
    tokens[1].flush('u'.repeat(43));
    const second = controller.expectOne(WRITE);
    expect(second.request.body).toEqual({ id: 2 });
    expect(second.request.headers.get('X-CSRF-Token')).toBe('u'.repeat(43));
    second.flush({});
    tokens[0].flush(TOKEN);
    const first = controller.expectOne(WRITE);
    expect(first.request.body).toEqual({ id: 1 });
    expect(first.request.headers.get('X-CSRF-Token')).toBe(TOKEN);
    first.flush({});
  });

  it('cancels token acquisition without submitting the write', () => {
    setup({ bearer: false });
    const subscription = http.patch(WRITE, {}, { context: cmsWriteContext() }).subscribe();
    const token = controller.expectOne(`${APP}/session/token`);
    subscription.unsubscribe();
    expect(token.cancelled).toBe(true);
    controller.expectNone(WRITE);
  });

  it('does not reuse a token after the session changes', () => {
    setup({ bearer: false });
    for (const token of [TOKEN, 'u'.repeat(43)]) {
      http.patch(WRITE, {}, { context: cmsWriteContext() }).subscribe();
      controller.expectOne(`${APP}/session/token`).flush(token);
      const write = controller.expectOne(WRITE);
      expect(write.request.headers.get('X-CSRF-Token')).toBe(token);
      write.flush({});
    }
  });

  it.each(['', '<html>Login page</html>'])('blocks the write if the token response is invalid', body => {
    setup({ bearer: false });
    const error = vi.fn();
    http.patch(WRITE, {}, { context: cmsWriteContext() }).subscribe({ error });
    controller.expectOne(`${APP}/session/token`).flush(body);
    expect(error).toHaveBeenCalledOnce();
    controller.expectNone(WRITE);
  });

  it('blocks the write when fetching its token fails', () => {
    setup({ bearer: false });
    const error = vi.fn();
    http.patch(WRITE, {}, { context: cmsWriteContext() }).subscribe({ error });
    controller.expectOne(`${APP}/session/token`).flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    expect(error).toHaveBeenCalledOnce();
    controller.expectNone(WRITE);
  });

  it.each([403, 500])('does not replay a submitted write after HTTP %s', status => {
    setup({ bearer: false });
    const error = vi.fn();
    http.patch(WRITE, {}, { context: cmsWriteContext() }).subscribe({ error });
    controller.expectOne(`${APP}/session/token`).flush(TOKEN);
    controller.expectOne(WRITE).flush({}, { status, statusText: 'Failed' });
    expect(error).toHaveBeenCalledOnce();
  });
});

describe('cmsCsrfInterceptor with FetchBackend', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  it('pairs the session token and write with explicit Cookie credentials in fetch', async () => {
    const fetch = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(TOKEN))
      .mockResolvedValueOnce(new Response('{}'));
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch(), withInterceptors([cmsCsrfInterceptor])),
        { provide: DOCUMENT, useValue: { location: { origin: APP }, baseURI: `${APP}/` } },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: API_URL, useValue: APP },
      ],
    });

    await firstValueFrom(TestBed.inject(HttpClient).post('/api/v1/node/new_resource', {}, {
      headers: { Authorization: 'Bearer fixture-bearer' },
      withCredentials: true,
      credentials: 'omit',
    }));

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, `${APP}/session/token`, expect.objectContaining({
      method: 'GET', credentials: 'include', body: null,
      cache: 'no-store', redirect: 'error',
      headers: { Accept: 'text/plain' },
    }));
    expect(fetch).toHaveBeenNthCalledWith(2, '/api/v1/node/new_resource', expect.objectContaining({
      method: 'POST', credentials: 'include',
      headers: expect.objectContaining({
        'Authorization': 'Bearer fixture-bearer', 'X-CSRF-Token': TOKEN,
      }),
    }));
  });

  it('passes cookie omission and the explicit Bearer header to fetch', async () => {
    const fetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('{}', { headers: { 'Content-Type': 'application/json' } })
    );
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch(), withInterceptors([cmsCsrfInterceptor])),
        { provide: DOCUMENT, useValue: { location: { origin: APP }, baseURI: `${APP}/`, cookie: '' } },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: API_URL, useValue: APP },
      ],
    });

    await firstValueFrom(TestBed.inject(HttpClient).patch(WRITE, { title: 'Updated' }, {
      headers: { Authorization: 'Bearer fixture-bearer' },
    }));

    expect(fetch).toHaveBeenCalledExactlyOnceWith(WRITE, expect.objectContaining({
      method: 'PATCH',
      credentials: 'omit',
      headers: expect.objectContaining({ Authorization: 'Bearer fixture-bearer' }),
      body: JSON.stringify({ title: 'Updated' }),
    }));
  });
});
