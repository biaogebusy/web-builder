import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { createMatDialogMock } from '@core/testing/mocks';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';

describe('UserService checkShow', () => {
  let service: UserService;

  const userWith = (roles: string[], uid = '5'): IUser =>
    ({ current_user: { roles, uid } }) as unknown as IUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: '' },
        { provide: CORE_CONFIG, useValue: {} },
        { provide: MatDialog, useValue: createMatDialogMock() },
      ],
    });
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('hides missing content', () => {
    expect(service.checkShow(undefined, undefined)).toBe(false);
    expect(service.checkShow(null, userWith(['authenticated']))).toBe(false);
  });

  it('shows unrestricted content to everyone', () => {
    expect(service.checkShow({}, undefined)).toBe(true);
    expect(service.checkShow({ params: {} }, undefined)).toBe(true);
    expect(service.checkShow({ params: { reqRoles: [] } }, undefined)).toBe(true);
  });

  it('hides restricted content from signed-out visitors', () => {
    expect(service.checkShow({ params: { reqRoles: ['editor'] } }, undefined)).toBe(false);
  });

  it('shows restricted content to users holding a required role', () => {
    const user = userWith(['authenticated', 'editor']);

    expect(service.checkShow({ params: { reqRoles: ['editor'] } }, user)).toBe(true);
  });

  it('always shows restricted content to uid 1', () => {
    const root = userWith(['authenticated'], '1');

    expect(service.checkShow({ params: { reqRoles: ['editor'] } }, root)).toBe(true);
  });

  it('hides restricted content from users without the role', () => {
    const user = userWith(['authenticated']);

    expect(service.checkShow({ params: { reqRoles: ['editor'] } }, user)).toBe(false);
  });
});
