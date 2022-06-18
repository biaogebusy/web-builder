import { Inject, Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserState } from '../mobx/user/UserState';
import { UserService } from '@core/service/user.service';
import { catchError, map } from 'rxjs/operators';
import { CORE_CONFIG } from '@core/token/core.config';
import { ICoreConfig } from '@core/mobx/IAppConfig';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userState: UserState,
    private userService: UserService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;
    if (state.url.startsWith('/my') || this.coreConfig?.guard?.authGuard) {
      return this.userService.getLoginState().pipe(
        map((status) => {
          console.log('userState:', status);
          if (status) {
            if (environment?.drupalProxy) {
              if (!this.userState.csrfToken) {
                this.userState.updateUserBySession();
              }
            }
            return true;
          } else {
            this.userState.logouLocalUser();
            if (environment?.drupalProxy) {
              window.location.href = 'user/login';
              return false;
            } else {
              this.router.navigate(['my/login'], {
                queryParams: { returnUrl: state.url },
              });
              return false;
            }
          }
        }),
        catchError(() => {
          this.router.navigate(['my/login']);
          return of(false);
        })
      );
    }
    return true;
  }
}
