import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';

export const superAdminGuard: CanActivateFn = () => {
  const currentUser = inject(USER)();
  const userService = inject(UserService);
  const router = inject(Router);
  const user = currentUser && typeof currentUser === 'object' ? currentUser as IUser : undefined;

  if (userService.checkShow({ params: { reqRoles: ['administrator'] } }, user)) {
    return true;
  }

  return router.createUrlTree(['/builder']);
};
