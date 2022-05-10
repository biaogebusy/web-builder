import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserState } from '../mobx/user/UserState';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiService } from '@core/service/api.service';
import { UserService } from '@core/service/user.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userState: UserState,
    private userService: UserService,
    private cryptoJS: CryptoJSService,
    private storage: LocalStorageService,
    private apiService: ApiService
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
    const baseConfig =
      this.storage.retrieve(this.apiService.baseConfigKey) || '';
    if (!baseConfig) {
      return false;
    }
    const config = JSON.parse(this.cryptoJS.decrypt(baseConfig));
    if (config?.guard && config?.guard?.authGuard) {
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
