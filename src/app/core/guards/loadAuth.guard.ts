import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../mobx/AppState';
import { UserState } from '../mobx/user/UserState';
import { ApiService } from '@core/service/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadAuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private userState: UserState,
    private appState: AppState,
    private apiService: ApiService
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.apiService.configLoadDone$.pipe(
      map((config: any) => {
        if (config) {
          if (this.appState.guard && this.appState.guard.authGuard) {
            if (this.userState.authenticated) {
              return true;
            }
            this.router.navigate(['user/login']);
            return false;
          }
          return true;
        }
        return false;
      })
    );
  }
}
