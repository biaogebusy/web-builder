import { TestBed } from '@angular/core/testing';
import { CanMatchFn, Router, UrlTree, provideRouter } from '@angular/router';
import { authMatchGuard } from '@core/guards/auth-match.guard';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

describe('authMatchGuard', () => {
  const runGuard = async (
    options: {
      browser?: boolean;
      coreConfig?: Record<string, unknown>;
      routeData?: Record<string, unknown>;
      currentUrl?: string;
      loggedIn?: boolean;
      loggedIn$?: BehaviorSubject<boolean>;
    } = {}
  ): Promise<boolean | UrlTree> => {
    const {
      browser = true,
      coreConfig = {},
      routeData = {},
      currentUrl = '/builder',
    } = options;
    const loggedIn$ = options.loggedIn$ ?? new BehaviorSubject(options.loggedIn ?? false);

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ScreenService, useValue: { isPlatformBrowser: vi.fn(() => browser) } },
        {
          provide: UserService,
          useValue: {
            getLoginState: vi.fn(() => loggedIn$.asObservable()),
            logoutUser: vi.fn(),
          },
        },
        { provide: CORE_CONFIG, useValue: coreConfig },
      ],
    });

    // Install the current navigation mock on the real Router instance
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'getCurrentNavigation').mockReturnValue({
      extractedUrl: router.parseUrl(currentUrl),
    } as never);

    return TestBed.runInInjectionContext(() => {
      const guard = authMatchGuard as CanMatchFn;
      const result = guard({ data: routeData } as never, []);
      if (typeof result === 'boolean' || result instanceof UrlTree) {
        return Promise.resolve(result);
      }
      return firstValueFrom(result as any);
    });
  };

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('allows navigation on the server (defers to client hydration)', async () => {
    expect(await runGuard({ browser: false })).toBe(true);
  });

  it('allows navigation when builder guard is explicitly disabled', async () => {
    expect(await runGuard({ coreConfig: { builder: { guard: false } } })).toBe(true);
  });

  it('ignores the disabled config when the route opts into strict auth', async () => {
    const result = await runGuard({
      coreConfig: { builder: { guard: false } },
      routeData: { requireAuth: true },
      loggedIn: false,
    });

    expect(result).not.toBe(true);
    expect(TestBed.inject(UserService).getLoginState).toHaveBeenCalled();
  });

  it('allows a logged-in user through', async () => {
    expect(await runGuard({ loggedIn: true })).toBe(true);
  });

  it('redirects an anonymous user to the login page with the current URL as returnUrl', async () => {
    const result = (await runGuard({
      loggedIn: false,
      currentUrl: '/builder/pages/42',
      coreConfig: { guard: { defaultFrontLoginPage: '/me/login' } },
    })) as UrlTree;

    const router = TestBed.inject(Router);
    expect(router.serializeUrl(result)).toContain('/me/login');
    expect(result.queryParams['returnUrl']).toBe('/builder/pages/42');
  });

  it('logs the user out before redirecting when anonymous', async () => {
    await runGuard({ loggedIn: false });
    expect(TestBed.inject(UserService).logoutUser).toHaveBeenCalled();
  });

  it('falls back to /me/login when no custom login page is configured', async () => {
    const result = (await runGuard({ loggedIn: false })) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toContain('/me/login');
  });

  it('uses / as returnUrl when the current navigation is unavailable', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ScreenService, useValue: { isPlatformBrowser: vi.fn(() => true) } },
        {
          provide: UserService,
          useValue: {
            getLoginState: vi.fn(() => new BehaviorSubject(false).asObservable()),
            logoutUser: vi.fn(),
          },
        },
        { provide: CORE_CONFIG, useValue: {} },
      ],
    });

    const router = TestBed.inject(Router);
    vi.spyOn(router, 'getCurrentNavigation').mockReturnValue(null as never);

    const result = await TestBed.runInInjectionContext(() => {
      const guard = authMatchGuard as CanMatchFn;
      const res = guard({ data: {} } as never, []);
      return firstValueFrom(res as any);
    });

    expect((result as UrlTree).queryParams['returnUrl']).toBe('/');
  });
});
