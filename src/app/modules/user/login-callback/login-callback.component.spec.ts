import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import {
  OAUTH_CALLBACK_DENIED,
  OAUTH_CALLBACK_NO_SESSION,
  OAUTH_CALLBACK_STATE_MISMATCH,
  UserService,
} from '@core/service/user.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import {
  createScreenServiceMock,
  createUserServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';

import { LoginCallbackComponent } from './login-callback.component';

describe('LoginCallbackComponent', () => {
  let component: LoginCallbackComponent;
  let fixture: ComponentFixture<LoginCallbackComponent>;
  let router: Router;
  const userService = createUserServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    userService.pendingReturnUrl = '';
    await TestBed.configureTestingModule({
      imports: [LoginCallbackComponent],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: UserService, useValue: userService },
        { provide: CORE_CONFIG, useValue: { login: { loginRedirect: '/home' } } },
        {
          provide: ScreenService,
          useValue: {
            ...createScreenServiceMock(),
            isPlatformBrowser: vi.fn(() => true),
            isPlatformServer: vi.fn(() => false),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCallbackComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('pins the page dark instead of following the active theme', () => {
    // The layout is built for a near-black surface, so the palette must not follow whatever
    // ThemeService put on <html>.
    expect(fixture.nativeElement.classList.contains('dark-theme')).toBe(true);
  });

  it('lands on the returnUrl the authorize request started from', async () => {
    userService.handleOAuthCallback.mockReturnValueOnce(
      Promise.resolve({ mode: 'redirect', returnUrl: '/builder' })
    );
    const navigateByUrl = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    await component.ngOnInit();

    expect(navigateByUrl).toHaveBeenCalledWith('/builder');
    expect(component.error()).toBe('');
  });

  it('falls back to the configured redirect when the request carried no returnUrl', async () => {
    userService.handleOAuthCallback.mockReturnValueOnce(
      Promise.resolve({ mode: 'redirect', returnUrl: '' })
    );
    const navigateByUrl = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    await component.ngOnInit();

    expect(navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('retries with a fresh authorize request, since the code in this URL is already spent', async () => {
    userService.handleOAuthCallback.mockReturnValueOnce(
      Promise.reject(new Error(OAUTH_CALLBACK_STATE_MISMATCH))
    );
    userService.pendingReturnUrl = '/builder';

    await component.ngOnInit();
    expect(component.error()).toBe('CALLBACK.ERROR_STATE_MISMATCH');

    component.retry();

    expect(component.error()).toBe('');
    expect(userService.startAuthorize).toHaveBeenCalledWith({
      mode: 'redirect',
      returnUrl: '/builder',
    });
  });

  it('retries towards the default page when no returnUrl survived the failure', async () => {
    userService.handleOAuthCallback.mockReturnValueOnce(
      Promise.reject(new Error(OAUTH_CALLBACK_NO_SESSION))
    );

    await component.ngOnInit();
    component.retry();

    expect(userService.startAuthorize).toHaveBeenCalledWith({
      mode: 'redirect',
      returnUrl: '/home',
    });
  });

  it('sends the user to the app login route, not the CMS one', async () => {
    userService.handleOAuthCallback.mockReturnValueOnce(
      Promise.reject(new Error(OAUTH_CALLBACK_NO_SESSION))
    );
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    await component.ngOnInit();
    component.goLogin();

    expect(navigate).toHaveBeenCalledWith(['/me/login']);
  });

  it('tells a user who declined the authorization apart from a broken one', async () => {
    userService.handleOAuthCallback.mockReturnValueOnce(
      Promise.reject(new Error(OAUTH_CALLBACK_DENIED))
    );

    await component.ngOnInit();

    expect(component.error()).toBe('CALLBACK.ERROR_DENIED');
  });

  it('never surfaces an unmapped internal reason, only localized copy', async () => {
    // A token-exchange HTTP failure arrives with a message no map covers.
    userService.handleOAuthCallback.mockReturnValueOnce(
      Promise.reject(new Error('Http failure response for /oauth/token: 500 Internal Server Error'))
    );

    await component.ngOnInit();

    expect(component.error()).toBe('CALLBACK.ERROR_GENERIC');
  });
});
