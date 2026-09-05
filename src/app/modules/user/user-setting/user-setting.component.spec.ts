import { WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import {
  createUserServiceMock,
  createUtilitiesServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';
import { of, Subject, throwError } from 'rxjs';

import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

import { UserSettingComponent } from './user-setting.component';

describe('UserSettingComponent', () => {
  let component: UserSettingComponent;
  let fixture: ComponentFixture<UserSettingComponent>;
  const user = { id: 'u-1', mail: 'a@b.co' } as IUser;
  const userService = createUserServiceMock();
  const util = createUtilitiesServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [UserSettingComponent],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: UserService, useValue: userService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    // Load only the keys this component uses, so assertions check real copy instead of keys
    TestBed.inject(TranslateService).setTranslation('zh-hans', {
      USER: {
        SETTING: {
          RESET: '重置',
          LOGOUT: '退出',
          LOGOUT_CONFIRM_TITLE: '退出登录',
          LOGOUT_CONFIRM_BODY: '确定要退出当前账号吗？',
          LOGOUT_CONFIRM_YES: '退出',
          LOGOUT_CONFIRM_NO: '取消',
          UPDATE: '更新账户',
          AVATAR_UPDATE: '更新头像',
          USERNAME_LENGTH_INVALID: '用户名需为 2-20 个字符',
          PASS_NEW_LENGTH_INVALID: '新密码至少 6 个字符',
          UPDATE_SUCCESS: '更新成功！',
          UPDATE_FAILED: '更新失败：{{reason}}',
          ERROR_NETWORK: '网络异常，请稍后重试',
          AVATAR_FORMAT_INVALID: '请检查图片格式',
          AVATAR_TOO_LARGE: '图片大小不能超过5M',
          AVATAR_UPLOAD_SUCCESS: '头像上传成功',
          AVATAR_UPLOAD_FAILED: '头像上传失败',
        },
      },
    });
    TestBed.inject(TranslateService).use('zh-hans');

    fixture = TestBed.createComponent(UserSettingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('strips the confirm password from the payload before updating the profile', () => {
    component.onUpdate({ name: 'admin', pass: { value: 'new-pass', confirm: 'new-pass' } }, user);

    expect(userService.editingUser).toHaveBeenCalledWith(user, {
      name: 'admin',
      pass: { value: 'new-pass' },
    });
    expect(util.openSnackbar).toHaveBeenCalledWith('更新成功！', 'ok');
    expect(component.loading()).toBe(false);
  });

  it('submits without crashing when the password fields were never rendered', () => {
    expect(() => component.onUpdate({ name: 'admin' }, user)).not.toThrow();

    expect(userService.editingUser).toHaveBeenCalledWith(user, { name: 'admin' });
  });

  it('reports the failure with a retry hint when the network errors out', () => {
    userService.editingUser.mockReturnValueOnce(
      throwError(() => new HttpErrorResponse({ status: 0 }))
    );

    component.onUpdate({ pass: {} }, user);

    expect(util.openSnackbar).toHaveBeenCalledWith('更新失败：网络异常，请稍后重试', 'ok');
    expect(component.loading()).toBe(false);
  });

  it('surfaces the backend validation detail when the update is rejected', () => {
    userService.editingUser.mockReturnValueOnce(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 422,
            error: { errors: [{ detail: '此邮箱已被占用。' }] },
          })
      )
    );

    component.onUpdate({ pass: {} }, user);

    expect(util.openSnackbar).toHaveBeenCalledWith('更新失败：此邮箱已被占用。', 'ok');
    expect(component.loading()).toBe(false);
  });

  it('restores the saved profile values when resetting the form', async () => {
    (component.user as WritableSignal<IUser | boolean>).set({
      ...user,
      current_user: { name: 'admin' },
      display_name: 'Admin',
    } as IUser);
    fixture.detectChanges();
    await vi.waitFor(() => expect(component.fields).toBeTruthy());

    const resetModel = vi.fn();
    component.options = { resetModel };
    component.onReset();

    expect(resetModel).toHaveBeenCalledWith({
      name: 'admin',
      full_name: 'Admin',
      mail: 'a@b.co',
      pass: {},
    });
  });

  it('resyncs the form to the refreshed profile after a successful update', async () => {
    const signalUser = component.user as WritableSignal<IUser | boolean>;
    signalUser.set({
      ...user,
      current_user: { name: 'admin' },
      display_name: 'Admin',
    } as IUser);
    fixture.detectChanges();
    await vi.waitFor(() => expect(component.fields).toBeTruthy());

    const resetModel = vi.fn();
    component.options = { resetModel };
    // An unrelated emission (a token refresh re-emits the pre-update cookie copy) lands before the
    // refetch answers; the resync has to follow the refetched profile, not that emission
    userService.updateUser.mockImplementationOnce(() => {
      signalUser.set({ ...user, current_user: { name: 'admin' }, display_name: 'Admin' } as IUser);
      return of({ ...user, current_user: { name: 'admin' }, display_name: 'New Nickname' } as IUser);
    });

    component.onUpdate({ name: 'admin', full_name: 'New Nickname', pass: {} }, user);

    await vi.waitFor(() => expect(resetModel).toHaveBeenCalled());
    expect(resetModel).toHaveBeenCalledTimes(1);
    expect(resetModel).toHaveBeenCalledWith({
      name: 'admin',
      full_name: 'New Nickname',
      mail: 'a@b.co',
      pass: {},
    });
  });

  it('keeps the saved nickname in the rendered input after a successful update', async () => {
    const signalUser = component.user as WritableSignal<IUser | boolean>;
    const profile = (displayName: string) =>
      ({ ...user, current_user: { name: 'root' }, display_name: displayName }) as IUser;
    signalUser.set(profile('root'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    (component.form.get('full_name') as any)?.setValue('roottest');
    fixture.detectChanges();
    await fixture.whenStable();

    userService.updateUser.mockImplementationOnce(() => {
      signalUser.set(profile('root'));
      return of(profile('roottest'));
    });

    component.onUpdate(component.model, profile('root'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[id*="full_name"]');
    expect(input.value).toBe('roottest');
    expect(component.model.full_name).toBe('roottest');
  });

  it('declares length rules as validation messages shown only on error', async () => {
    (component.user as WritableSignal<IUser | boolean>).set({
      ...user,
      current_user: { name: 'admin' },
    } as IUser);
    fixture.detectChanges();
    await vi.waitFor(() => expect(component.fields).toBeTruthy());

    const tabs = (component.fields as any)[0].fieldGroup;
    const basicFields = tabs[0].fieldGroup;
    const passwordFields = tabs[1].fieldGroup[0].fieldGroup;

    expect(basicFields[0].props.description).toBeUndefined();
    expect(basicFields[0].validation.messages).toEqual({
      minlength: '用户名需为 2-20 个字符',
      maxlength: '用户名需为 2-20 个字符',
    });
    expect(passwordFields[0].validation.messages).toEqual({
      minlength: '新密码至少 6 个字符',
    });
  });

  it('logs out and closes every open dialog once the user confirms', () => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    const closeAll = vi.spyOn(dialog, 'closeAll');
    vi.spyOn(dialog, 'open').mockReturnValue({ afterClosed: () => of(true) } as any);

    component.onLogout();

    expect(dialog.open).toHaveBeenCalledWith(
      DialogComponent,
      expect.objectContaining({
        data: expect.objectContaining({ title: '退出登录', yesLabel: '退出', noLabel: '取消' }),
      })
    );
    expect(userService.logout).toHaveBeenCalled();
    expect(closeAll).toHaveBeenCalled();
  });

  it('keeps the session when the user cancels the logout dialog', () => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    vi.spyOn(dialog, 'open').mockReturnValue({ afterClosed: () => of(false) } as any);

    component.onLogout();

    expect(userService.logout).not.toHaveBeenCalled();
  });

  it('stays quiet when the file picker was cancelled without a selection', async () => {
    await component.handleFileChange({ target: { files: [] } } as unknown as Event, user);

    expect(util.openSnackbar).not.toHaveBeenCalled();
    expect(userService.uploadUserPicture).not.toHaveBeenCalled();
  });

  it('rejects non-image files with a format warning', async () => {
    const file = new File(['x'], 'doc.pdf', { type: 'application/pdf' });

    await component.handleFileChange({ target: { files: [file] } } as unknown as Event, user);

    expect(util.openSnackbar).toHaveBeenCalledWith('请检查图片格式', 'ok');
    expect(userService.uploadUserPicture).not.toHaveBeenCalled();
  });

  it('rejects avatars above the 5M size limit', async () => {
    const file = new File(['x'], 'avatar.png', { type: 'image/png' });
    Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024 });

    await component.handleFileChange({ target: { files: [file] } } as unknown as Event, user);

    expect(util.openSnackbar).toHaveBeenCalledWith('图片大小不能超过5M', 'ok');
    expect(userService.uploadUserPicture).not.toHaveBeenCalled();
  });

  it('uploads the avatar and confirms the success', async () => {
    const file = new File(['avatar-bytes'], 'avatar.png', { type: 'image/png' });

    await component.handleFileChange({ target: { files: [file] } } as unknown as Event, user);

    expect(userService.uploadUserPicture).toHaveBeenCalledWith(user, expect.any(ArrayBuffer));
    expect(util.openSnackbar).toHaveBeenCalledWith('头像上传成功', 'ok');
    expect(component.loading()).toBe(false);
  });

  it('clears the file input so the same avatar can be picked again', async () => {
    const target = { files: [new File(['x'], 'avatar.png', { type: 'image/png' })], value: 'set' };

    await component.handleFileChange({ target } as unknown as Event, user);

    expect(target.value).toBe('');
  });

  it('shows the loading state while the avatar upload is in flight', async () => {
    const file = new File(['avatar-bytes'], 'avatar.png', { type: 'image/png' });
    const pending = new Subject<any>();
    userService.uploadUserPicture.mockReturnValueOnce(pending);

    const uploading = component.handleFileChange(
      { target: { files: [file] } } as unknown as Event,
      user
    );

    expect(component.loading()).toBe(true);

    // the subscription is set up only after the FileReader await resolves
    await vi.waitFor(() => expect(userService.uploadUserPicture).toHaveBeenCalled());

    pending.next({});
    await uploading;
    expect(component.loading()).toBe(false);
  });
});
