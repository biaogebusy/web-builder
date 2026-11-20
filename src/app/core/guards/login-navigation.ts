import { inject } from '@angular/core';
import { Router, type GuardResult } from '@angular/router';
import { catchError, defer, finalize, from, of, switchMap, take, tap } from 'rxjs';
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
  const navigation = router.getCurrentNavigation();

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
          tap(authenticated => {
            // Abort before CanMatch can fall through; the router restores the history position.
            if (!authenticated) navigation?.abort();
          }),
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
