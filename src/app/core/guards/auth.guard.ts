import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '@core/service/user.service';
import { environment } from 'src/environments/environment';
import { CORE_CONFIG } from '@core/token/token-providers';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const screenService = inject(ScreenService);
  const coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  if (!(screenService.isPlatformBrowser() && environment.production)) {
    return of(true);
  }

  const { authGuard: needsAuth, defaultFrontLoginPage } = coreConfig.guard;
  if (!needsAuth && !state.url.startsWith('/my')) {
    return of(true);
  }

  return userService.getLoginState().pipe(
    map(status => {
      if (status) {
        return true;
      }
      userService.logoutUser();
      router.navigate([defaultFrontLoginPage ?? '/me/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }),
    catchError(() => {
      router.navigate([defaultFrontLoginPage ?? '/me/login']);
      return of(false);
    })
  );
};
