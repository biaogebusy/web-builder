import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../mobx/AppState';
import { UserState } from '../mobx/user/UserState';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiService } from '@core/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userState: UserState,
    private appState: AppState,
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
    const config = JSON.parse(
      this.cryptoJS.decrypt(
        this.storage.retrieve(this.apiService.baseConfigKey)
      )
    );
    if (config.guard && config.guard.authGuard) {
      if (this.userState.authenticated) {
        return true;
      }
      this.router.navigate(['user/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    return true;
  }
}
