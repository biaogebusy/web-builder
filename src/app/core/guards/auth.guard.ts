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
import { catchError, map, switchMap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@core/token/token-providers';
import { NodeService } from '@core/service/node.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userState: UserState,
    private userService: UserService,
    private nodeService: NodeService,
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
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
    return this.nodeService.search(`/api/v1/config`, 'content=/core/base').pipe(
      switchMap((config: any) => {
        if (state.url.startsWith('/my') || config?.guard?.authGuard) {
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
                  window.location.href = '/user/login';
                  return false;
                } else {
                  this.router.navigate(['/me/login'], {
                    queryParams: { returnUrl: state.url },
                  });
                  return false;
                }
              }
            }),
            catchError(() => {
              if (environment?.drupalProxy) {
                window.location.href = '/user/login';
                return of(false);
              } else {
                this.router.navigate(['/me/login']);
                return of(false);
              }
            })
          );
        }
        return of(true);
      })
    );
  }
}
