import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import { superAdminGuard } from './super-admin.guard';

describe('superAdminGuard', () => {
  const createUser = (uid: string, roles: string[]): IUser =>
    ({ current_user: { uid, name: 'test', roles } }) as IUser;

  const setup = (user: IUser | boolean) => {
    const router = {
      createUrlTree: vi.fn(() => new UrlTree()),
    };
    const userService = {
      checkShow: (content: { params: { reqRoles: string[] } }, currentUser?: IUser) => {
        if (!currentUser) {
          return false;
        }
        return (
          content.params.reqRoles.some(role => currentUser.current_user.roles.includes(role)) ||
          currentUser.current_user.uid === '1'
        );
      },
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: USER, useValue: signal(user) },
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router },
      ],
    });

    return router;
  };

  it('allows users with the administrator role', () => {
    setup(createUser('2', ['authenticated', 'administrator']));

    expect(TestBed.runInInjectionContext(() => superAdminGuard(null!, null!))).toBe(true);
  });

  it('allows the Drupal superuser with uid 1', () => {
    setup(createUser('1', ['authenticated']));

    expect(TestBed.runInInjectionContext(() => superAdminGuard(null!, null!))).toBe(true);
  });

  it('redirects other users to the builder', () => {
    const router = setup(createUser('2', ['authenticated']));

    const result = TestBed.runInInjectionContext(() => superAdminGuard(null!, null!));

    expect(result).toBeInstanceOf(UrlTree);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/builder']);
  });
});
