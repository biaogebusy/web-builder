import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { authMatchGuard } from './auth-match.guard';
import { authGuard } from './auth.guard';

@Component({ template: 'Public' })
class PublicPage {}
@Component({ template: 'Private' })
class PrivatePage {}
@Component({ template: 'Fallback' })
class FallbackPage {}

describe('shared login navigation', () => {
  let router: Router;
  let harness: RouterTestingHarness;
  let authenticated: boolean;
  let closed: Subject<boolean>;
  const dialog = { afterClosed: () => closed, close: vi.fn() };
  const user = { getLoginState: vi.fn(), logoutUser: vi.fn(), openLoginDialog: vi.fn() };
  const config = { builder: { guard: false }, guard: { defaultFrontLoginPage: '/me/login' } };

  beforeEach(async () => {
    vi.clearAllMocks();
    authenticated = false;
    closed = new Subject();
    config.guard.defaultFrontLoginPage = '/me/login';
    user.getLoginState.mockImplementation(() => of(authenticated));
    user.openLoginDialog.mockResolvedValue(dialog);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'public', component: PublicPage },
          { path: 'other', component: PublicPage },
          { path: 'me/login', component: PublicPage },
          { path: 'sign-in', component: PublicPage },
          { path: 'protected', component: PrivatePage,
            canMatch: [authMatchGuard], data: { requireAuth: true } },
          { path: 'my/profile', component: PrivatePage, canActivate: [authGuard] },
          { path: '**', component: FallbackPage },
        ]),
        { provide: CORE_CONFIG, useValue: config },
        { provide: UserService, useValue: user },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
      ],
    });
    router = TestBed.inject(Router);
    harness = await RouterTestingHarness.create();
  });

  it.each(['/protected', '/my/profile'])('resumes %s with its query and fragment after login',
    async path => {
      await harness.navigateByUrl('/public?source=menu#intro');
      const target = `${path}?filter=draft#details`;
      const navigation = router.navigateByUrl(target);
      await vi.waitFor(() => expect(user.openLoginDialog).toHaveBeenCalledOnce());
      expect(router.url).toBe('/public?source=menu#intro');
      expect(user.openLoginDialog).toHaveBeenCalledWith(target, expect.any(AbortSignal));
      authenticated = true;
      closed.next(true);
      expect(await navigation).toBe(true);
      expect(router.url).toBe(target);
    });

  it.each(['/protected', '/my/profile'])('cancels %s without entering the fallback route',
    async path => {
      await harness.navigateByUrl('/public?source=menu#intro');
      const navigation = router.navigateByUrl(path);
      await vi.waitFor(() => expect(user.openLoginDialog).toHaveBeenCalledOnce());
      closed.next(true);
      await navigation;
      expect(router.url).toBe('/public?source=menu#intro');
      expect(harness.routeNativeElement?.textContent).toBe('Public');
    });

  it('uses the full login page on an initial visit and preserves the complete target', async () => {
    const target = '/protected?filter=draft#details';
    await harness.navigateByUrl(target);
    expect(router.parseUrl(router.url).queryParams['returnUrl']).toBe(target);
    expect(router.url).toMatch(/^\/me\/login\?/);
    expect(user.openLoginDialog).not.toHaveBeenCalled();
  });

  it('honors a configured login page during in-app navigation', async () => {
    await harness.navigateByUrl('/public');
    config.guard.defaultFrontLoginPage = '/sign-in';
    await harness.navigateByUrl('/protected');
    expect(router.url).toBe('/sign-in?returnUrl=%2Fprotected');
    expect(user.openLoginDialog).not.toHaveBeenCalled();
  });

  it('uses the login page if loading the dialog fails', async () => {
    await harness.navigateByUrl('/public');
    user.openLoginDialog.mockRejectedValueOnce(new Error('chunk unavailable'));
    await harness.navigateByUrl('/protected');
    expect(router.url).toBe('/me/login?returnUrl=%2Fprotected');
  });

  it('closes a pending dialog when navigation is superseded', async () => {
    await harness.navigateByUrl('/public');
    const navigation = router.navigateByUrl('/protected');
    await vi.waitFor(() => expect(user.openLoginDialog).toHaveBeenCalledOnce());
    const signal: AbortSignal = user.openLoginDialog.mock.calls[0][1];
    await router.navigateByUrl('/other');
    expect(await navigation).toBe(false);
    expect(signal.aborted).toBe(true);
    expect(dialog.close).toHaveBeenCalled();
    authenticated = true;
    closed.next(true);
    expect(router.url).toBe('/other');
  });

  it('closes a dialog that resolves after the original navigation was cancelled', async () => {
    await harness.navigateByUrl('/public');
    let resolve!: (value: typeof dialog) => void;
    user.openLoginDialog.mockReturnValueOnce(new Promise(value => { resolve = value; }));
    const navigation = router.navigateByUrl('/protected');
    await vi.waitFor(() => expect(user.openLoginDialog).toHaveBeenCalledOnce());
    await router.navigateByUrl('/other');
    await navigation;
    resolve(dialog);
    await vi.waitFor(() => expect(dialog.close).toHaveBeenCalled());
    expect(router.url).toBe('/other');
  });
});
