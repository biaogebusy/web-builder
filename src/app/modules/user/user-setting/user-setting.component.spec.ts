import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import {
  createUserServiceMock,
  createUtilitiesServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';
import { throwError } from 'rxjs';

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

  it('reports the failure when the profile update errors out', () => {
    userService.editingUser.mockReturnValueOnce(throwError(() => new Error('boom')));

    component.onUpdate({ pass: {} }, user);

    expect(util.openSnackbar).toHaveBeenCalledWith('更新失败！', 'ok');
    expect(component.loading()).toBe(false);
  });

  it('logs out and closes every open dialog', () => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    const closeAll = vi.spyOn(dialog, 'closeAll');

    component.onLogout();

    expect(userService.logout).toHaveBeenCalled();
    expect(closeAll).toHaveBeenCalled();
  });

  it('rejects the avatar when no file was picked', async () => {
    await component.handleFileChange({ target: { files: [] } } as unknown as Event, user);

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
  });
});
