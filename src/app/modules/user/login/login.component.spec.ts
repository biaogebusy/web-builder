import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { createUserServiceMock, provideCoreMocks } from '@core/testing/mocks';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

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
    });
  });

  it('shows the backend message when the phone login fails', () => {
    userService.loginByPhone.mockReturnValueOnce(of({ ok: false, message: '验证码错误' }));
    component.phoneForm.patchValue({ phone: '13800138000', code: '1234' });

    component.loginByPhone();

    expect(userService.loginByPhone).toHaveBeenCalledWith('13800138000', '1234');
    expect(component.error()).toBe('验证码错误');
    expect(component.loading()).toBe(false);
  });

  it('keeps the error empty when the phone login succeeds', () => {
    userService.loginByPhone.mockReturnValueOnce(of({ ok: true }));
    component.phoneForm.patchValue({ phone: '13800138000', code: '1234' });

    component.loginByPhone();

    expect(component.error()).toBe('');
    expect(component.loading()).toBe(false);
  });

  it('validates the phone number before requesting a code', () => {
    const event = { preventDefault: vi.fn() };

    component.getCode(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.error()).toBe('请输入手机号码');
    expect(userService.getCode).not.toHaveBeenCalled();
  });

  it('rejects a malformed phone number', () => {
    component.phoneForm.patchValue({ phone: '12345' });

    component.getCode({ preventDefault: vi.fn() });

    expect(component.error()).toBe('请输入正确的手机号码');
    expect(userService.getCode).not.toHaveBeenCalled();
  });

  it('requests the code and starts the countdown from the configured left time', () => {
    component.phoneForm.patchValue({ phone: '13800138000' });

    component.getCode({ preventDefault: vi.fn() });

    expect(userService.getCode).toHaveBeenCalledWith('13800138000');
    expect(component.countdown()).toBe(60);
  });
});
