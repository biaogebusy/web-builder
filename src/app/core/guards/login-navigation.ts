import { inject } from '@angular/core';
import { RedirectCommand, Router, type GuardResult } from '@angular/router';
import { catchError, defer, finalize, from, map, of, switchMap, take } from 'rxjs';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { UserService } from '@core/service/user.service';
import { CORE_CONFIG } from '@core/token/token-providers';

/** Resume an in-app navigation after login, or use the configured page for an initial visit. */
export function checkLoginForNavigation(returnUrl: string) {
  const router = inject(Router);
  const userService = inject(UserService);
  const config = inject<ICoreConfig>(CORE_CONFIG);
  const loginPage = config?.guard?.defaultFrontLoginPage ?? '/me/login';
  const loginUrl = router.createUrlTree([loginPage], { queryParams: { returnUrl } });
  const currentUrl = router.parseUrl(router.url);

  return userService.getLoginState().pipe(
    take(1),
    switchMap(loggedIn => {
      if (loggedIn) return of<GuardResult>(true);
      userService.logoutUser();
      if (!router.navigated || loginPage !== '/me/login') return of(loginUrl);

      return defer(() => {
        const controller = new AbortController();
        let dialog: Awaited<ReturnType<UserService['openLoginDialog']>> | undefined;
        const opening = userService.openLoginDialog(returnUrl, controller.signal).then(ref => {
          dialog = ref;
          if (controller.signal.aborted) ref.close();
          return ref;
        });
        return from(opening).pipe(
          switchMap(ref => ref.afterClosed()),
          take(1),
          // A close result alone does not prove that authentication succeeded.
          switchMap(() => userService.getLoginState().pipe(take(1))),
          map(authenticated =>
            authenticated || new RedirectCommand(currentUrl, { replaceUrl: true })),
          finalize(() => {
            controller.abort();
            dialog?.close();
          })
        );
      });
    }),
    catchError(() => of(loginUrl))
  );
}
