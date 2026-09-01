import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { authInterceptor } from '@core/interceptor/auth.interceptor';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;

describe('authInterceptor', () => {
  let httpTesting: HttpTestingController;
  let http: HttpClient;
  let userServiceMock: ReturnType<typeof createUserServiceMock>;

  const setup = (
    userFactory: () => Partial<IUser> | null,
    options: { isBrowser?: boolean } = {}
  ) => {
    const { isBrowser = true } = options;
    userServiceMock = createUserServiceMock(userFactory, isBrowser);

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: UserService, useValue: userServiceMock },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  };

  afterEach(() => {
    try {
      httpTesting.verify();
    } catch {
      // Error-path tests may leave requests in an errored state.
    }
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  const capture = <T>(source: Observable<T>) => {
    const result: { value?: T; error?: unknown; completed: boolean } = { completed: false };
    const sub = source.subscribe({
      next: v => (result.value = v),
      error: e => (result.error = e),
      complete: () => (result.completed = true),
    });
    return { result, unsubscribe: () => sub.unsubscribe() };
  };

  describe('path-based bypass', () => {
    it('passes through the oauth token URL without adding a token', () => {
      setup(() => ({ access_token: 'abc', expires_at: Date.now() + 60_000 }));
      http.get(environment.oauth.tokenUrl).subscribe();
      const req = httpTesting.expectOne(environment.oauth.tokenUrl);
      expect(req.request.headers.has('Authorization')).toBe(false);
      req.flush({});
    });

    it('passes through OTP generate without adding a token', () => {
      setup(() => ({ access_token: 'abc', expires_at: Date.now() + 60_000 }));
      http.get(`${API}/api/v3/otp/generate`).subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/otp/generate`);
      expect(req.request.headers.has('Authorization')).toBe(false);
      req.flush({});
    });

    it('passes through OTP login without adding a token', () => {
      setup(() => ({ access_token: 'abc', expires_at: Date.now() + 60_000 }));
      http.get(`${API}/api/v3/otp/login`).subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/otp/login`);
      expect(req.request.headers.has('Authorization')).toBe(false);
      req.flush({});
    });
  });

  describe('pre-auth header / no user', () => {
    it('keeps an existing Authorization header and forwards the request', () => {
      setup(() => null);
      http
        .get(`${API}/api/v3/some/endpoint`, { headers: { Authorization: 'Bearer custom' } })
        .subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/some/endpoint`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer custom');
      req.flush({});
    });

    it('forwards anonymously when no user is stored', () => {
      setup(() => null);
      http.get(`${API}/api/v3/some/endpoint`).subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/some/endpoint`);
      expect(req.request.headers.has('Authorization')).toBe(false);
      req.flush({});
    });

    it('forwards anonymously when the stored user has no access_token', () => {
      setup(() => ({ access_token: '' } as Partial<IUser>));
      http.get(`${API}/api/v3/some/endpoint`).subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/some/endpoint`);
      expect(req.request.headers.has('Authorization')).toBe(false);
      req.flush({});
    });
  });

  describe('SSR (isBrowser = false)', () => {
    it('forwards anonymously when the token is already expired on the server', () => {
      setup(() => ({ access_token: 'stale', expires_at: Date.now() - 1000 }), {
        isBrowser: false,
      });
      http.get(`${API}/api/v3/some/endpoint`).subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/some/endpoint`);
      expect(req.request.headers.has('Authorization')).toBe(false);
      req.flush({});
    });

    it('adds the bearer token when still valid on the server', () => {
      setup(() => ({ access_token: 'ssr-token', expires_at: Date.now() + 5000 }), {
        isBrowser: false,
      });
      http.get(`${API}/api/v3/some/endpoint`).subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/some/endpoint`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer ssr-token');
      req.flush({});
    });

    it('never refreshes proactively on the server (forward anonymously if expired)', () => {
      setup(() => ({ access_token: 'old', expires_at: Date.now() - 1000 }), {
        isBrowser: false,
      });
      http.get(`${API}/api/v3/some/endpoint`).subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/some/endpoint`);
      expect(req.request.headers.has('Authorization')).toBe(false);
      expect(userServiceMock.refreshAccessToken).not.toHaveBeenCalled();
      req.flush({});
    });
  });

  describe('browser — normal flow', () => {
    it('adds a Bearer token when the user has a valid access_token', () => {
      setup(() => ({ access_token: 'valid', expires_at: Date.now() + 10 * 60 * 1000 }));
      http.get(`${API}/api/v3/some/endpoint`).subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/some/endpoint`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer valid');
      req.flush({});
    });

    it('proactively refreshes when the token is within the 30s leeway window', () => {
      setup(() => ({
        access_token: 'almost-dead',
        refresh_token: 'refresh-me',
        expires_at: Date.now() + 10 * 1000, // 10s from now — inside 30s leeway
      }));
      userServiceMock.refreshAccessToken.mockReturnValue(
        of({ access_token: 'new-token', refresh_token: 'new-refresh', expires_in: 3600 })
      );

      http.get(`${API}/api/v3/some/endpoint`).subscribe();

      expect(userServiceMock.refreshAccessToken).toHaveBeenCalled();
      const req = httpTesting.expectOne(`${API}/api/v3/some/endpoint`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer new-token');
      expect(userServiceMock.applyRefreshedToken).toHaveBeenCalled();
      req.flush({});
    });

    it('logs the user out when a proactive refresh returns null token data', () => {
      setup(() => ({
        access_token: 'almost-dead',
        refresh_token: 'refresh-me',
        expires_at: Date.now() + 10 * 1000, // inside the 30s leeway → proactive refresh
      }));
      userServiceMock.refreshAccessToken.mockReturnValue(of(null));

      const { result } = capture(http.get(`${API}/api/v3/some/endpoint`));

      expect(userServiceMock.refreshAccessToken).toHaveBeenCalled();
      expect(userServiceMock.logoutUser).toHaveBeenCalled();
      expect((result.error as Error).message).toContain('Token refresh failed');
      // The original request never goes out: the refresh throws before next().
      httpTesting.expectNone(`${API}/api/v3/some/endpoint`);
    });

    it('logs the user out when a proactive refresh throws', () => {
      setup(() => ({
        access_token: 'almost-dead',
        refresh_token: 'refresh-me',
        expires_at: Date.now() + 10 * 1000,
      }));
      userServiceMock.refreshAccessToken.mockReturnValue(
        throwError(() => new Error('network error'))
      );

      const { result } = capture(http.get(`${API}/api/v3/some/endpoint`));

      expect(userServiceMock.logoutUser).toHaveBeenCalled();
      expect((result.error as Error).message).toBe('network error');
      httpTesting.expectNone(`${API}/api/v3/some/endpoint`);
    });

    it('does not refresh proactively when there is no refresh_token', () => {
      setup(() => ({
        access_token: 'almost-dead',
        refresh_token: '',
        expires_at: Date.now() + 10 * 1000,
      }));
      http.get(`${API}/api/v3/some/endpoint`).subscribe();
      const req = httpTesting.expectOne(`${API}/api/v3/some/endpoint`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer almost-dead');
      expect(userServiceMock.refreshAccessToken).not.toHaveBeenCalled();
      req.flush({});
    });
  });

  describe('error handling', () => {
    it('re-throws non-401 errors without attempting refresh', () => {
      setup(() => ({ access_token: 'tok', expires_at: Date.now() + 60_000 }));
      const { result } = capture(http.get(`${API}/api/v3/endpoint`));

      const req = httpTesting.expectOne(`${API}/api/v3/endpoint`);
      req.flush('boom', { status: 500, statusText: 'Server Error' });

      expect((result.error as HttpErrorResponse).status).toBe(500);
      expect(userServiceMock.refreshAccessToken).not.toHaveBeenCalled();
    });

    it('re-throws 401 when the URL is not the apiUrl (no refresh attempt)', () => {
      setup(() => ({ access_token: 'tok', refresh_token: 'r', expires_at: Date.now() + 60_000 }));
      const { result } = capture(http.get('https://other.domain/endpoint'));

      const req = httpTesting.expectOne('https://other.domain/endpoint');
      req.flush('unauth', { status: 401, statusText: 'Unauthorized' });

      expect((result.error as HttpErrorResponse).status).toBe(401);
      expect(userServiceMock.refreshAccessToken).not.toHaveBeenCalled();
    });

    it('re-throws 401 when there is no refresh_token (cannot refresh)', () => {
      setup(() => ({ access_token: 'tok', refresh_token: '', expires_at: Date.now() + 60_000 }));
      const { result } = capture(http.get(`${API}/api/v3/endpoint`));

      const req = httpTesting.expectOne(`${API}/api/v3/endpoint`);
      req.flush('unauth', { status: 401, statusText: 'Unauthorized' });

      expect((result.error as HttpErrorResponse).status).toBe(401);
      expect(userServiceMock.refreshAccessToken).not.toHaveBeenCalled();
    });

    it('refreshes and retries on 401 when a refresh_token exists', () => {
      setup(() => ({ access_token: 'old', refresh_token: 'ref', expires_at: Date.now() + 60_000 }));
      userServiceMock.refreshAccessToken.mockReturnValue(
        of({ access_token: 'fresh', refresh_token: 'ref2', expires_in: 3600 })
      );

      http.get(`${API}/api/v3/endpoint`).subscribe();

      // First request → 401 → interceptor refreshes → second request with new token
      const req1 = httpTesting.expectOne(`${API}/api/v3/endpoint`);
      expect(req1.request.headers.get('Authorization')).toBe('Bearer old');
      req1.flush('unauth', { status: 401, statusText: 'Unauthorized' });

      expect(userServiceMock.refreshAccessToken).toHaveBeenCalledTimes(1);
      expect(userServiceMock.applyRefreshedToken).toHaveBeenCalled();

      const req2 = httpTesting.expectOne(`${API}/api/v3/endpoint`);
      expect(req2.request.headers.get('Authorization')).toBe('Bearer fresh');
      req2.flush({ ok: true });
    });

    it('logs the user out when refresh returns null token data', () => {
      setup(() => ({ access_token: 'old', refresh_token: 'ref', expires_at: Date.now() + 60_000 }));
      userServiceMock.refreshAccessToken.mockReturnValue(of(null));

      const { result } = capture(http.get(`${API}/api/v3/endpoint`));

      const req1 = httpTesting.expectOne(`${API}/api/v3/endpoint`);
      req1.flush('unauth', { status: 401, statusText: 'Unauthorized' });

      expect((result.error as Error).message).toContain('Token refresh failed');
      expect(userServiceMock.logoutUser).toHaveBeenCalled();
    });

    it('logs the user out when refresh throws an error', () => {
      setup(() => ({ access_token: 'old', refresh_token: 'ref', expires_at: Date.now() + 60_000 }));
      userServiceMock.refreshAccessToken.mockReturnValue(
        throwError(() => new Error('network error'))
      );

      const { result } = capture(http.get(`${API}/api/v3/endpoint`));

      const req1 = httpTesting.expectOne(`${API}/api/v3/endpoint`);
      req1.flush('unauth', { status: 401, statusText: 'Unauthorized' });

      expect((result.error as Error).message).toBe('network error');
      expect(userServiceMock.logoutUser).toHaveBeenCalled();
    });
  });

  describe('concurrent requests during refresh', () => {
    it('queues a second request while refresh is in-flight and retries with the new token', () => {
      let emitRefresh: ((token: any) => void) | undefined;
      const refreshObs = new Observable(subscriber => {
        emitRefresh = (token: any) => {
          subscriber.next(token);
          subscriber.complete();
        };
      });

      setup(() => ({ access_token: 'old', refresh_token: 'ref', expires_at: Date.now() + 60_000 }));
      userServiceMock.refreshAccessToken.mockReturnValue(refreshObs);

      // Fire 2 concurrent requests
      const sub1 = http.get(`${API}/api/v3/a`).subscribe();
      const sub2 = http.get(`${API}/api/v3/b`).subscribe();

      // First request triggers 401 → starts refresh
      const reqA1 = httpTesting.expectOne(`${API}/api/v3/a`);
      reqA1.flush('unauth', { status: 401, statusText: 'Unauthorized' });

      // Second request also 401s, joins the queue (does NOT start a second refresh)
      const reqB1 = httpTesting.expectOne(`${API}/api/v3/b`);
      reqB1.flush('unauth', { status: 401, statusText: 'Unauthorized' });

      expect(userServiceMock.refreshAccessToken).toHaveBeenCalledTimes(1);

      // Resolve the refresh
      emitRefresh!({ access_token: 'new', refresh_token: 'r2', expires_in: 3600 });

      // Both requests should retry with the new token
      const reqA2 = httpTesting.expectOne(`${API}/api/v3/a`);
      expect(reqA2.request.headers.get('Authorization')).toBe('Bearer new');
      reqA2.flush({ ok: true });

      const reqB2 = httpTesting.expectOne(`${API}/api/v3/b`);
      expect(reqB2.request.headers.get('Authorization')).toBe('Bearer new');
      reqB2.flush({ ok: true });

      sub1.unsubscribe();
      sub2.unsubscribe();
    });

    it('starts a brand-new refresh on a later 401 after an earlier refresh finished', () => {
      // Locks the module-level isRefreshing reset: a completed refresh must not
      // leave the interceptor stuck in the "queued" branch for the next 401.
      setup(() => ({ access_token: 'old', refresh_token: 'ref', expires_at: Date.now() + 60_000 }));
      userServiceMock.refreshAccessToken
        .mockReturnValueOnce(of({ access_token: 'fresh-1', refresh_token: 'r1', expires_in: 3600 }))
        .mockReturnValueOnce(of({ access_token: 'fresh-2', refresh_token: 'r2', expires_in: 3600 }));

      // First cycle: 401 → refresh → retry with fresh-1.
      http.get(`${API}/api/v3/first`).subscribe();
      const first1 = httpTesting.expectOne(`${API}/api/v3/first`);
      first1.flush('unauth', { status: 401, statusText: 'Unauthorized' });
      const first2 = httpTesting.expectOne(`${API}/api/v3/first`);
      expect(first2.request.headers.get('Authorization')).toBe('Bearer fresh-1');
      first2.flush({ ok: true });

      // Second cycle: a fresh refresh must be started, not the queued branch.
      http.get(`${API}/api/v3/second`).subscribe();
      const second1 = httpTesting.expectOne(`${API}/api/v3/second`);
      second1.flush('unauth', { status: 401, statusText: 'Unauthorized' });
      const second2 = httpTesting.expectOne(`${API}/api/v3/second`);
      expect(second2.request.headers.get('Authorization')).toBe('Bearer fresh-2');
      second2.flush({ ok: true });

      expect(userServiceMock.refreshAccessToken).toHaveBeenCalledTimes(2);
    });
  });
});

// --- helpers ---

function createUserServiceMock(
  userFactory: () => Partial<IUser> | null,
  isBrowser: boolean
) {
  return {
    getStoredUser: vi.fn(() => userFactory() as IUser | null),
    refreshAccessToken: vi.fn(() => of(null)),
    applyRefreshedToken: vi.fn(),
    logoutUser: vi.fn(),
    isBrowser,
    getLoginState: vi.fn(() => of(false)),
    getLoginStatus: vi.fn(() => of(false)),
  } as any;
}
