import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { firstValueFrom, of } from 'rxjs';

describe('authGuard', () => {
  const runGuard = async (
    url: string,
    options: {
      browser?: boolean;
      coreConfig?: Record<string, unknown>;
      loggedIn?: boolean;
    } = {}
  ): Promise<boolean | UrlTree> => {
    const { browser = true, coreConfig = {}, loggedIn = false } = options;

    TestBed.resetTestingModule();
    const router = {
      navigate: vi.fn(() => Promise.resolve(true)),
      createUrlTree: vi.fn(commands => '/' + commands.join('/')),
      parseUrl: vi.fn(() => ({} as UrlTree)),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: ScreenService, useValue: { isPlatformBrowser: vi.fn(() => browser) } },
        {
          provide: UserService,
          useValue: {
            getLoginState: vi.fn(() => of(loggedIn)),
            logoutUser: vi.fn(),
          },
        },
        { provide: CORE_CONFIG, useValue: coreConfig },
        { provide: USER, useValue: signal(false) },
      ],
    });

    return TestBed.runInInjectionContext(() => {
      const guard = authGuard as CanActivateFn;
      const result = guard(null as never, { url } as never);
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

  it('allows everything when not in a production browser environment (SSR / dev)', async () => {
    expect(await runGuard('/builder', { browser: false })).toBe(true);
  });

  it('allows public routes when authGuard is off and URL is not /my/*', async () => {
    expect(await runGuard('/about', { coreConfig: { guard: { authGuard: false } } })).toBe(true);
  });

  it('allows anonymous access to non-/my paths by default (needsAuth defaults to false)', async () => {
    expect(await runGuard('/any-public-path')).toBe(true);
  });

  it('redirects an anonymous user on /my/* to the login page', async () => {
    await runGuard('/my/settings', {
      coreConfig: { guard: { authGuard: true, defaultFrontLoginPage: '/me/login' } },
      loggedIn: false,
    });

    const router = TestBed.inject(Router) as unknown as { navigate: ReturnType<typeof vi.fn> };
    expect(router.navigate).toHaveBeenCalledWith(
      ['/me/login'],
      { queryParams: { returnUrl: '/my/settings' } }
    );
  });

  it('allows a logged-in user through', async () => {
    expect(
      await runGuard('/my/settings', {
        coreConfig: { guard: { authGuard: true } },
        loggedIn: true,
      })
    ).toBe(true);
  });

  it('logs the user out before redirecting when not logged in', async () => {
    await runGuard('/my/settings', {
      coreConfig: { guard: { authGuard: true } },
      loggedIn: false,
    });

    expect(TestBed.inject(UserService).logoutUser).toHaveBeenCalled();
  });

  it('falls back to /me/login when no custom login page is configured', async () => {
    await runGuard('/my/settings', {
      coreConfig: { guard: { authGuard: true } },
      loggedIn: false,
    });

    const router = TestBed.inject(Router) as unknown as { navigate: ReturnType<typeof vi.fn> };
    expect(router.navigate).toHaveBeenCalledWith(
      ['/me/login'],
      expect.objectContaining({ queryParams: { returnUrl: '/my/settings' } })
    );
  });

  it('triggers auth check when the authGuard config flag is true, even for non-/my paths', async () => {
    await runGuard('/about', {
      coreConfig: { guard: { authGuard: true } },
      loggedIn: false,
    });

    expect(TestBed.inject(UserService).getLoginState).toHaveBeenCalled();
  });
});
