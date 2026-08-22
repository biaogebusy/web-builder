import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
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
      Promise.reject(new Error('OAuth state mismatch'))
    );
    userService.pendingReturnUrl = '/builder';

    await component.ngOnInit();
    expect(component.error()).toBe('OAuth state mismatch');

    component.retry();

    expect(component.error()).toBe('');
    expect(userService.startAuthorize).toHaveBeenCalledWith({
      mode: 'redirect',
      returnUrl: '/builder',
    });
  });

  it('retries towards the default page when no returnUrl survived the failure', async () => {
    userService.handleOAuthCallback.mockReturnValueOnce(Promise.reject(new Error('boom')));

    await component.ngOnInit();
    component.retry();

    expect(userService.startAuthorize).toHaveBeenCalledWith({
      mode: 'redirect',
      returnUrl: '/home',
    });
  });

  it('sends the user to the app login route, not the CMS one', async () => {
    userService.handleOAuthCallback.mockReturnValueOnce(Promise.reject(new Error('boom')));
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    await component.ngOnInit();
    component.goLogin();

    expect(navigate).toHaveBeenCalledWith(['/me/login']);
  });
});
