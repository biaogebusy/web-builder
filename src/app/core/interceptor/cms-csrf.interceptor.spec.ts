import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '@core/token/token-providers';
import { UserService } from '@core/service/user.service';
import { authInterceptor } from './auth.interceptor';
import { cmsCsrfInterceptor, CMS_CSRF_ADDITIONAL_PATHS } from './cms-csrf.interceptor';

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
        { provide: CMS_CSRF_ADDITIONAL_PATHS, useValue: [/^\/api\/v3\/extension\/action$/] },
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
    controller.verify();
    TestBed.resetTestingModule();
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
  ])('pairs %s %s with its session token even when using Bearer', (method, url) => {
    setup();
    const body = { uuid: 'shared-component', body: [] };
    http.request(method, url, { body }).subscribe();
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

  it('supports cookie-only callers and language-prefixed absolute URLs', () => {
    setup({ bearer: false });
    const url = `${APP}/en${WRITE}?preview=1`;
    http.patch(url, {}).subscribe();
    controller.expectOne(`${APP}/session/token`).flush(TOKEN);
    const write = controller.expectOne(url);
    expect(write.request.headers.has('Authorization')).toBe(false);
    expect(write.request.headers.get('X-CSRF-Token')).toBe(TOKEN);
    write.flush({});
  });

  it.each(['GET', 'HEAD', 'OPTIONS', 'TRACE'])('does not fetch tokens for %s', method => {
    setup();
    http.request(method, WRITE).subscribe();
    controller.expectOne(WRITE).flush(null);
  });

  it.each(['/oauth/token', '/api/v3/otp/login', '/api/v3/session/logout', '/api/v3/unrelated'])('leaves unrelated paths alone: %s', url => {
      setup();
      http.post(url, {}).subscribe();
      controller.expectOne(url).flush({});
    });

  it('keeps an explicitly supplied CSRF token', () => {
    setup();
    http.patch(WRITE, {}, { headers: { 'X-CSRF-Token': 'caller-token' } }).subscribe();
    const write = controller.expectOne(WRITE);
    expect(write.request.headers.get('X-CSRF-Token')).toBe('caller-token');
    write.flush({});
  });

  it('does not fetch browser session tokens during SSR', () => {
    setup({ platform: 'server' });
    http.patch(WRITE, {}).subscribe();
    controller.expectOne(WRITE).flush({});
  });

  it.each([`${CMS}.evil.test${WRITE}`, `https://other.test${WRITE}`, `//other.test${WRITE}`])('never requests or attaches a CSRF token for another origin: %s', url => {
      setup({ apiUrl: CMS });
      http.patch(url, {}, { withCredentials: true }).subscribe();
      const write = controller.expectOne(url);
      expect(write.request.headers.has('X-CSRF-Token')).toBe(false);
      write.flush({});
    });

  it('uses the configured CMS subdirectory and matches cross-origin cookie credentials', () => {
    setup({ apiUrl: `${CMS}/cms/` });
    const url = `${CMS}/cms/zh-hans${WRITE}`;
    http.patch(url, {}, { withCredentials: true }).subscribe();
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
    http.patch(`${CMS}${WRITE}`, {}, { credentials: 'include' }).subscribe();
    const token = controller.expectOne(`${CMS}/session/token`);
    expect(token.request.credentials).toBe('include');
    token.flush(TOKEN);
    controller.expectOne(`${CMS}${WRITE}`).flush({});
  });

  it('supports the relative frontend proxy when API_URL points to a different origin', () => {
    setup({ apiUrl: CMS });
    http.patch(WRITE, {}).subscribe();
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

  it('does not reuse a token after the session changes', () => {
    setup();
    for (const token of [TOKEN, 'u'.repeat(43)]) {
      http.patch(WRITE, {}).subscribe();
      controller.expectOne(`${APP}/session/token`).flush(token);
      const write = controller.expectOne(WRITE);
      expect(write.request.headers.get('X-CSRF-Token')).toBe(token);
      write.flush({});
    }
  });

  it.each(['', '<html>Login page</html>'])('blocks the write if the token response is invalid', body => {
    setup();
    const error = vi.fn();
    http.patch(WRITE, {}).subscribe({ error });
    controller.expectOne(`${APP}/session/token`).flush(body);
    expect(error).toHaveBeenCalledOnce();
    controller.expectNone(WRITE);
  });

  it('blocks the write when fetching its token fails', () => {
    setup();
    const error = vi.fn();
    http.patch(WRITE, {}).subscribe({ error });
    controller.expectOne(`${APP}/session/token`).flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    expect(error).toHaveBeenCalledOnce();
    controller.expectNone(WRITE);
  });

  it.each([403, 500])('does not replay a submitted write after HTTP %s', status => {
    setup();
    const error = vi.fn();
    http.patch(WRITE, {}).subscribe({ error });
    controller.expectOne(`${APP}/session/token`).flush(TOKEN);
    controller.expectOne(WRITE).flush({}, { status, statusText: 'Failed' });
    expect(error).toHaveBeenCalledOnce();
  });
});
