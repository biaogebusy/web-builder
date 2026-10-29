import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CORE_CONFIG } from '@core/token/token-providers';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { checkLoginForNavigation } from './login-navigation';

export const authGuard: CanActivateFn = (_route, state) => {
  const screenService = inject(ScreenService);
  const coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  if (!(screenService.isPlatformBrowser() && environment.production)) {
    return of(true);
  }

  const needsAuth = coreConfig?.guard?.authGuard ?? false;
  if (!needsAuth && !state.url.startsWith('/my')) {
    return of(true);
  }

  return checkLoginForNavigation(state.url);
};
