import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { CORE_CONFIG } from '@core/token/token-providers';

export const authMatchGuard: CanMatchFn = (route, _segments) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const screen = inject(ScreenService);
  const coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  // SSR has no client cookie storage — defer login check to client hydration
  if (!screen.isPlatformBrowser()) {
    return true;
  }

  // Routes that opt in to strict login bypass the public-config check
  const requireAuth = route.data?.['requireAuth'] === true;

  // Fail-closed: only treat as public when explicitly guard=false AND route hasn't opted in to strict auth
  if (!requireAuth && coreConfig?.builder?.guard === false) {
    return true;
  }

  return userService.getLoginState().pipe(
    map(loggedIn => {
      if (loggedIn) {
        return true;
      }
      userService.logoutUser();
      const returnUrl = router.getCurrentNavigation()?.extractedUrl.toString() ?? '/';
      const loginPage = coreConfig?.guard?.defaultFrontLoginPage ?? '/me/login';
      return router.createUrlTree([loginPage], { queryParams: { returnUrl } });
    })
  );
};
