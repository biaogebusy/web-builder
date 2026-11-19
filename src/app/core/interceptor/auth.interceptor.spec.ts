import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from '@core/interceptor/auth.interceptor';
import { UserService } from '@core/service/user.service';
import { IUser, OAuthTokenResponse } from '@core/interface/IUser';
import { Observable, Subject, of, throwError } from 'rxjs';
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
    httpTesting.verify({ ignoreCancelled: true });
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
      setup(() => ({ access_token: '' }) as Partial<IUser>);
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

  describe('refresh failure and session ownership', () => {
    it.each(['error', 'empty'] as const)('ends every queued request on refresh %s', outcome => {
      setup(() => ({ access_token: 'old', refresh_token: 'ref', expires_at: Date.now() + 60_000 }));
      const refresh = new Subject();
      userServiceMock.refreshAccessToken.mockReturnValue(refresh);
      const first = capture(http.get(`${API}/api/v3/first`));
      const second = capture(http.get(`${API}/api/v3/second`));
      try {
        httpTesting
          .expectOne(`${API}/api/v3/first`)
          .flush('', { status: 401, statusText: 'Unauthorized' });
        httpTesting
          .expectOne(`${API}/api/v3/second`)
          .flush('', { status: 401, statusText: 'Unauthorized' });
        if (outcome === 'error') refresh.error(new Error('refresh offline'));
        else refresh.complete();
        expect(first.result.error).toBeTruthy();
        expect(second.result.error).toBe(first.result.error);
        expect(userServiceMock.logoutUser).toHaveBeenCalledTimes(1);
      } finally {
        first.unsubscribe();
        second.unsubscribe();
      }
    });

    it('does not revive a failed queue when a later account refreshes', () => {
      let stored: Partial<IUser> = {
        access_token: 'account-a',
        refresh_token: 'refresh-a',
        expires_at: Date.now() + 60_000,
        current_user: { uid: '7', name: 'A', roles: [] },
      };
      setup(() => stored);
      const refresh = new Subject();
      userServiceMock.refreshAccessToken
        .mockReturnValueOnce(refresh)
        .mockReturnValueOnce(of({ access_token: 'account-b-new', expires_in: 3600 }));
      const first = capture(http.get(`${API}/api/v3/first`));
      const queued = capture(http.get(`${API}/api/v3/queued`));
      try {
        for (const name of ['first', 'queued'])
          httpTesting
            .expectOne(`${API}/api/v3/${name}`)
            .flush('', { status: 401, statusText: 'Unauthorized' });
        refresh.error(new Error('failed'));
        stored = {
          access_token: 'account-b',
          refresh_token: 'refresh-b',
          expires_at: 1,
          current_user: { uid: '8', name: 'B', roles: [] },
        };
        const later = capture(http.get(`${API}/api/v3/later`));
        httpTesting.expectOne(`${API}/api/v3/later`).flush({ ok: true });
        httpTesting.expectNone(`${API}/api/v3/queued`);
        expect(queued.result.error).toBe(first.result.error);
        later.unsubscribe();
      } finally {
        first.unsubscribe();
        queued.unsubscribe();
      }
    });

    it.each([401, 403, 404, 503, 0])(
      'keeps application error %s separate from a successful refresh',
      status => {
        setup(() => ({ access_token: 'old', refresh_token: 'ref', expires_at: 1 }));
        userServiceMock.refreshAccessToken.mockReturnValue(
          of({ access_token: 'fresh', expires_in: 3600 })
        );
        const request = capture(http.get(`${API}/api/v3/endpoint`));
        const pending = httpTesting.expectOne(`${API}/api/v3/endpoint`);
        if (status) pending.flush('', { status, statusText: 'Failed' });
        else pending.error(new ProgressEvent('error'));
        expect((request.result.error as HttpErrorResponse).status).toBe(status);
        expect(userServiceMock.logoutUser).not.toHaveBeenCalled();
        request.unsubscribe();
      }
    );

    it('does not refresh a request whose 401 arrives after its account changed', () => {
      let stored: Partial<IUser> = {
        access_token: 'account-a',
        refresh_token: 'refresh-a',
        expires_at: Date.now() + 60_000,
        current_user: { uid: '7', name: 'A', roles: [] },
      };
      setup(() => stored);
      userServiceMock.refreshAccessToken.mockReturnValue(
        of({ access_token: 'account-b-new', expires_in: 3600 })
      );
      const request = capture(http.get(`${API}/api/v3/late`));
      stored = {
        access_token: 'account-b',
        refresh_token: 'refresh-b',
        expires_at: 1,
        current_user: { uid: '8', name: 'B', roles: [] },
      };
      httpTesting
        .expectOne(`${API}/api/v3/late`)
        .flush('', { status: 401, statusText: 'Unauthorized' });
      try {
        expect(userServiceMock.refreshAccessToken).not.toHaveBeenCalled();
        httpTesting.expectNone(`${API}/api/v3/late`);
        expect(request.result.error).toBeTruthy();
      } finally {
        request.unsubscribe();
      }
    });
  });

  describe('refresh cancellation and session changes', () => {
    const account = (token: string, uid = '7'): Partial<IUser> => ({
      access_token: token,
      refresh_token: `refresh-${token}`,
      expires_at: 1,
      current_user: { uid, name: uid, roles: [] },
    });

    it.each(['logout', 'account', 'credentials'] as const)(
      'cancels all waiters on %s before the stored cookie changes',
      change => {
        let stored = account('a');
        setup(() => stored);
        const refresh = new Subject<OAuthTokenResponse>();
        const cancelled = vi.fn();
        userServiceMock.refreshAccessToken.mockReturnValue(
          new Observable(sub => {
            const source = refresh.subscribe(sub);
            return () => {
              source.unsubscribe();
              cancelled();
            };
          })
        );
        const first = capture(http.get(`${API}/api/v3/first`));
        const queued = capture(http.get(`${API}/api/v3/queued`));
        const nextUser =
          change === 'logout' ? false : account('b', change === 'account' ? '8' : '7');
        userServiceMock.userSub$.next(nextUser);
        stored = nextUser || account('signed-out');
        expect(first.result.error).toBeTruthy();
        expect(queued.result.error).toBe(first.result.error);
        expect(cancelled).toHaveBeenCalledTimes(1);
        refresh.next({ access_token: 'late', token_type: 'Bearer', expires_in: 3600 });
        refresh.error(new Error('late failure'));
        expect(userServiceMock.applyRefreshedToken).not.toHaveBeenCalled();
        expect(userServiceMock.logoutUser).not.toHaveBeenCalled();
        httpTesting.expectNone(`${API}/api/v3/first`);
        httpTesting.expectNone(`${API}/api/v3/queued`);
      }
    );

    it('lets a remaining waiter finish when only one caller cancels', () => {
      setup(() => account('a'));
      const refresh = new Subject<OAuthTokenResponse>();
      userServiceMock.refreshAccessToken.mockReturnValue(refresh);
      const first = capture(http.get(`${API}/api/v3/first`));
      const queued = capture(http.get(`${API}/api/v3/queued`));
      first.unsubscribe();
      expect(refresh.observed).toBe(true);
      refresh.next({ access_token: 'fresh', token_type: 'Bearer', expires_in: 3600 });
      httpTesting.expectNone(`${API}/api/v3/first`);
      httpTesting.expectOne(`${API}/api/v3/queued`).flush({ ok: true });
      expect(queued.result.completed).toBe(true);
      expect(userServiceMock.refreshAccessToken).toHaveBeenCalledTimes(1);
    });

    it('releases the refresh when all callers cancel and permits a new round', () => {
      setup(() => account('a'));
      const refresh = new Subject<OAuthTokenResponse>();
      userServiceMock.refreshAccessToken
        .mockReturnValueOnce(refresh)
        .mockReturnValueOnce(of({ access_token: 'fresh', expires_in: 3600 }));
      const first = capture(http.get(`${API}/api/v3/first`));
      const queued = capture(http.get(`${API}/api/v3/queued`));
      first.unsubscribe();
      queued.unsubscribe();
      expect(refresh.observed).toBe(false);
      expect(userServiceMock.userSub$.observed).toBe(false);
      expect(userServiceMock.logoutUser).not.toHaveBeenCalled();
      const later = capture(http.get(`${API}/api/v3/later`));
      httpTesting.expectOne(`${API}/api/v3/later`).flush({ ok: true });
      expect(later.result.completed).toBe(true);
      expect(userServiceMock.refreshAccessToken).toHaveBeenCalledTimes(2);
    });

    it('checks ownership for each token delivery after another waiter switches accounts', () => {
      let stored = account('a');
      setup(() => stored);
      const refresh = new Subject<OAuthTokenResponse>();
      userServiceMock.refreshAccessToken.mockReturnValue(refresh);
      const switchAccount = () => {
        stored = account('b', '8');
      };
      const switchInterceptor: HttpInterceptorFn = (req, next) => {
        switchAccount();
        return next(req);
      };
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(withInterceptors([authInterceptor, switchInterceptor])),
          provideHttpClientTesting(),
          { provide: UserService, useValue: userServiceMock },
        ],
      });
      http = TestBed.inject(HttpClient);
      httpTesting = TestBed.inject(HttpTestingController);
      const first = capture(http.get(`${API}/api/v3/first`));
      const queued = capture(http.get(`${API}/api/v3/queued`));
      refresh.next({ access_token: 'fresh', token_type: 'Bearer', expires_in: 3600 });
      httpTesting.expectOne(`${API}/api/v3/first`).flush({ ok: true });
      httpTesting.expectNone(`${API}/api/v3/queued`);
      expect(first.result.completed).toBe(true);
      expect(queued.result.error).toBeTruthy();
      expect(userServiceMock.logoutUser).not.toHaveBeenCalled();
    });

    it('does not replace an explicit token after a 401', () => {
      setup(() => account('a'));
      const request = capture(
        http.get(`${API}/api/v3/custom`, {
          headers: { Authorization: 'Bearer custom' },
        })
      );
      httpTesting
        .expectOne(`${API}/api/v3/custom`)
        .flush('', { status: 401, statusText: 'Unauthorized' });
      expect((request.result.error as HttpErrorResponse).status).toBe(401);
      expect(userServiceMock.refreshAccessToken).not.toHaveBeenCalled();
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
      // A completed refresh must release the round before another request needs it.
      setup(() => ({ access_token: 'old', refresh_token: 'ref', expires_at: Date.now() + 60_000 }));
      userServiceMock.refreshAccessToken
        .mockReturnValueOnce(of({ access_token: 'fresh-1', refresh_token: 'r1', expires_in: 3600 }))
        .mockReturnValueOnce(
          of({ access_token: 'fresh-2', refresh_token: 'r2', expires_in: 3600 })
        );

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

function createUserServiceMock(userFactory: () => Partial<IUser> | null, isBrowser: boolean) {
  let original: Partial<IUser> | null = null;
  let refreshed: Partial<IUser> = {};
  const mock = {
    userSub$: new Subject<IUser | boolean>(),
    getStoredUser: vi.fn(() => {
      const user = userFactory();
      if (
        user &&
        original &&
        user.access_token === original.access_token &&
        user.refresh_token === original.refresh_token &&
        user.current_user?.uid === original.current_user?.uid
      ) {
        return { ...user, ...refreshed } as IUser;
      }
      return user as IUser | null;
    }),
    refreshAccessToken: vi.fn(() => of(null)),
    applyRefreshedToken: vi.fn((token: OAuthTokenResponse) => {
      original = userFactory();
      const next = {
        ...token,
        refresh_token: token.refresh_token ?? original?.refresh_token,
        expires_at: Date.now() + token.expires_in * 1000,
      };
      mock.userSub$.next({ ...original, ...next } as IUser);
      refreshed = next;
      return { ...original, ...refreshed };
    }),
    logoutUser: vi.fn(),
    isBrowser,
    getLoginState: vi.fn(() => of(false)),
    getLoginStatus: vi.fn(() => of(false)),
  } as any;
  return mock;
}
