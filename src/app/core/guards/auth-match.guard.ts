import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { checkLoginForNavigation } from './login-navigation';

export const authMatchGuard: CanMatchFn = (route, _segments) => {
  const router = inject(Router);
  const screen = inject(ScreenService);
  const coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  // SSR has no client cookie storage: defer login check to client hydration
  if (!screen.isPlatformBrowser()) {
    return true;
  }

  // Routes that opt in to strict login bypass the public-config check
  const requireAuth = route.data?.['requireAuth'] === true;

  // Fail-closed: only treat as public when explicitly guard=false AND route hasn't opted in to strict auth
  if (!requireAuth && coreConfig?.builder?.guard === false) {
    return true;
  }

  const returnUrl = router.getCurrentNavigation()?.extractedUrl.toString() ?? '/';
  return checkLoginForNavigation(returnUrl);
};
