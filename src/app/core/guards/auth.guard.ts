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

    if (this.coreConfig?.guard && this.coreConfig?.guard?.authGuard) {
      return this.userService.getLoginState().pipe(
        map((status) => {
          console.log('userState:', status);
          if (status) {
            return true;
          } else {
            this.userState.logouLocalUser();
            this.router.navigate(['user/login'], {
              queryParams: { returnUrl: state.url },
            });
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['user/login']);
          return of(false);
        })
      );
    }
    return true;
  }
}
