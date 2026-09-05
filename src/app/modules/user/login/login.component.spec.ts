import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { OAUTH_POPUP_BLOCKED, OAUTH_POPUP_TIMEOUT, UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import {
  createScreenServiceMock,
  createUserServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

const clickEvent = (): Event => ({ preventDefault: vi.fn() }) as unknown as Event;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const userService = createUserServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: UserService, useValue: userService },
        { provide: CORE_CONFIG, useValue: { login: { phoneLogin: { leftTime: 60 } } } },
        { provide: MatDialogRef, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts the OAuth redirect flow when not opened inside a dialog', () => {
    component.login();

    expect(component.loading()).toBe(true);
    expect(userService.startAuthorize).toHaveBeenCalledWith({
      mode: 'redirect',
      returnUrl: undefined,
      signal: expect.any(AbortSignal),
    });
  });

  it('falls back to localized copy instead of echoing an unmapped backend message', () => {
    userService.loginByPhone.mockReturnValueOnce(of({ ok: false, message: 'Unexpected failure' }));
    component.phoneForm.patchValue({ phone: '13800138000', code: '1234' });

    component.loginByPhone();

    expect(userService.loginByPhone).toHaveBeenCalledWith('13800138000', '1234');
    expect(component.error()).toBe('LOGIN.ERROR_LOGIN_FAILED');
    expect(component.loading()).toBe(false);
  });

  it('keeps the error empty when the phone login succeeds', () => {
    userService.loginByPhone.mockReturnValueOnce(of({ ok: true }));
    component.phoneForm.patchValue({ phone: '13800138000', code: '1234' });

    component.loginByPhone();

    expect(component.error()).toBe('');
    expect(component.loading()).toBe(false);
  });

  it('shows the missing fields instead of submitting an incomplete form', () => {
    component.phoneForm.patchValue({ phone: '13800138000' });

    component.loginByPhone();

    expect(userService.loginByPhone).not.toHaveBeenCalled();
    expect(component.phoneForm.controls['code'].touched).toBe(true);
    expect(component.loading()).toBe(false);
  });

  it('validates the phone number before requesting a code', () => {
    const event = { preventDefault: vi.fn() };

    component.getCode(event as unknown as Event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.phoneForm.controls['phone'].touched).toBe(true);
    // Field-level problems belong to the field's mat-error, not the banner.
    expect(component.error()).toBe('');
    expect(userService.getCode).not.toHaveBeenCalled();
  });

  it('rejects a malformed phone number', () => {
    component.phoneForm.patchValue({ phone: '12345' });

    component.getCode(clickEvent());

    expect(component.error()).toBe('');
    expect(userService.getCode).not.toHaveBeenCalled();
  });

  it('requests the code and starts the countdown from the configured left time', () => {
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('zh-hans', { LOGIN: { CODE_SENT: 'sent to {{phone}}' } });
    translate.use('zh-hans');
    userService.getCode.mockReturnValueOnce(of({ ok: true }));
    component.phoneForm.patchValue({ phone: '13800138000' });

    component.getCode(clickEvent());

    expect(userService.getCode).toHaveBeenCalledWith('13800138000');
    expect(component.countdown()).toBe(60);
    expect(component.notice()).toBe('sent to 138****8000');
  });

  it('keeps the countdown closed when the backend refused to send a code', () => {
    userService.getCode.mockReturnValueOnce(
      of({ ok: false, code: 'phone_not_registered', message: 'The number is not registered' })
    );
    component.phoneForm.patchValue({ phone: '13800138000' });

    component.getCode(clickEvent());

    expect(component.countdown()).toBe(0);
    expect(component.notice()).toBe('');
    expect(component.error()).toBe('LOGIN.ERROR_NOT_REGISTERED');
  });

  it('tells throttling apart from a plain send failure', () => {
    userService.getCode.mockReturnValueOnce(of({ ok: false, status: 429 }));
    component.phoneForm.patchValue({ phone: '13800138000' });

    component.getCode(clickEvent());

    expect(component.error()).toBe('LOGIN.ERROR_CODE_THROTTLED');
    expect(component.countdown()).toBe(0);
  });

  it('maps the backend error code returned by the login endpoint', () => {
    userService.loginByPhone.mockReturnValueOnce(of({ ok: false, code: 'code_incorrect' }));
    component.phoneForm.patchValue({ phone: '13800138000', code: '1234' });

    component.loginByPhone();

    expect(component.error()).toBe('LOGIN.ERROR_CODE_INVALID');
  });

  it('localizes an older backend that still answers with plain English', () => {
    userService.loginByPhone.mockReturnValueOnce(of({ ok: false, message: 'Incorrect Code' }));
    component.phoneForm.patchValue({ phone: '13800138000', code: '1234' });

    component.loginByPhone();

    expect(component.error()).toBe('LOGIN.ERROR_CODE_INVALID');
  });

  it('clears a stale error when a new attempt starts', () => {
    component.error.set('previous failure');
    userService.loginByPhone.mockReturnValueOnce(of({ ok: true }));
    component.phoneForm.patchValue({ phone: '13800138000', code: '1234' });

    component.loginByPhone();

    expect(component.error()).toBe('');
  });

  it('recovers from a blocked popup instead of staying stuck in loading', async () => {
    userService.startAuthorize.mockReturnValueOnce(Promise.reject(new Error(OAUTH_POPUP_BLOCKED)));

    component.login();
    await Promise.resolve();
    await Promise.resolve();

    expect(component.loading()).toBe(false);
    expect(component.error()).toBe('LOGIN.ERROR_POPUP_BLOCKED');
  });

  it('explains a popup that timed out', async () => {
    userService.startAuthorize.mockReturnValueOnce(Promise.reject(new Error(OAUTH_POPUP_TIMEOUT)));

    component.login();
    await Promise.resolve();
    await Promise.resolve();

    expect(component.loading()).toBe(false);
    expect(component.error()).toBe('LOGIN.ERROR_POPUP_TIMEOUT');
  });

  it('aborts the popup watcher when the form is destroyed', () => {
    component.login();
    const [{ signal }] = userService.startAuthorize.mock.lastCall as unknown as [
      { signal: AbortSignal },
    ];

    expect(signal.aborted).toBe(false);
    fixture.destroy();

    expect(signal.aborted).toBe(true);
  });

  describe('social providers', () => {
    const configureWith = async (socialLogin: unknown): Promise<void> => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [LoginComponent],
        providers: [
          provideRouter([]),
          ...provideCoreMocks(),
          { provide: UserService, useValue: userService },
          {
            provide: CORE_CONFIG,
            useValue: { login: { phoneLogin: { leftTime: 60 }, socialLogin } },
          },
          { provide: MatDialogRef, useValue: null },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    };

    it('drops a provider that carries neither an idp nor a url', async () => {
      await configureWith({
        enable: true,
        providers: [
          { enable: true, label: 'Nowhere' },
          { enable: true, label: 'Linux.do', idp: 'linux_do' },
          { enable: true, label: 'GitHub', url: '/user/login/github' },
          { enable: false, label: 'Google', url: '/user/login/google' },
        ],
      });

      expect(component.socialProviders.map(provider => provider.label)).toEqual([
        'Linux.do',
        'GitHub',
      ]);
    });

    it('offers nothing when the whole social group is off', async () => {
      await configureWith({
        enable: false,
        providers: [{ enable: true, label: 'GitHub', url: '/user/login/github' }],
      });

      expect(component.socialProviders).toEqual([]);
    });

    it('federates an idp provider behind the plain authorize request', async () => {
      await configureWith({
        enable: true,
        providers: [{ enable: true, label: 'Linux.do', idp: 'linux_do' }],
      });

      component.socialLogin(component.socialProviders[0]);

      expect(userService.startAuthorize).toHaveBeenCalledWith({
        mode: 'redirect',
        returnUrl: undefined,
        signal: expect.any(AbortSignal),
        idp: 'linux_do',
      });
      expect(userService.startSocialAuthorize).not.toHaveBeenCalled();
    });

    it('routes a url provider through the authorize hop instead of a bare CMS link', async () => {
      await configureWith({
        enable: true,
        providers: [{ enable: true, label: 'GitHub', url: '/user/login/github' }],
      });

      component.socialLogin(component.socialProviders[0]);

      expect(userService.startSocialAuthorize).toHaveBeenCalledWith('/user/login/github', {
        mode: 'redirect',
        returnUrl: undefined,
        signal: expect.any(AbortSignal),
      });
      expect(userService.startAuthorize).not.toHaveBeenCalled();
    });
  });

  describe('returning from the redirect', () => {
    beforeEach(async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [LoginComponent],
        providers: [
          provideRouter([]),
          ...provideCoreMocks(),
          { provide: UserService, useValue: userService },
          { provide: CORE_CONFIG, useValue: { login: { phoneLogin: { leftTime: 60 } } } },
          { provide: MatDialogRef, useValue: null },
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

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('clears the overlay when the page comes back from the bfcache', () => {
      component.login();
      expect(component.loading()).toBe(true);

      const event = new Event('pageshow');
      Object.defineProperty(event, 'persisted', { value: true });
      window.dispatchEvent(event);

      expect(component.loading()).toBe(false);
    });

    it('leaves the overlay alone on a plain load', () => {
      component.login();

      const event = new Event('pageshow');
      Object.defineProperty(event, 'persisted', { value: false });
      window.dispatchEvent(event);

      expect(component.loading()).toBe(true);
    });
  });
});
