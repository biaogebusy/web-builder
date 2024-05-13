import { Inject, Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NodeService } from '@core/service/node.service';
import { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { ICoreConfig } from '@core/interface/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private nodeService: NodeService,
    @Inject(USER) private user: IUser
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
    if (environment.production) {
      return this.nodeService
        .fetch(`/api/v1/config`, 'content=/core/base')
        .pipe(
          switchMap((config: ICoreConfig) => {
            const {
              authGuard,
              defaultDrupalLoginPage,
              defaultFrontLoginPage,
              checkUserState,
            } = config.guard;
            if (state.url.startsWith('/my') || authGuard) {
              return this.userService.getLoginState().pipe(
                map((status) => {
                  // console.log('userState:', status);
                  if (status) {
                    if (environment?.drupalProxy) {
                      if (!this.user.csrf_token) {
                        this.userService.updateUserBySession();
                      }
                    }
                    return true;
                  } else {
                    this.userService.logoutLocalUser();
                    if (environment?.drupalProxy) {
                      window.location.href =
                        defaultDrupalLoginPage || '/user/login';
                      return false;
                    } else {
                      this.router.navigate(
                        [defaultFrontLoginPage || '/me/login'],
                        {
                          queryParams: { returnUrl: state.url },
                        }
                      );
                      return false;
                    }
                  }
                }),
                catchError(() => {
                  if (environment?.drupalProxy) {
                    window.location.href =
                      defaultDrupalLoginPage || '/user/login';
                    return of(false);
                  } else {
                    this.router.navigate([
                      defaultFrontLoginPage || '/me/login',
                    ]);
                    return of(false);
                  }
                })
              );
            } else {
              if (checkUserState) {
                // user logged check state
                this.userService
                  .getLoginState()
                  .pipe(
                    tap((status) => {
                      if (!status) {
                        this.userService.logoutLocalUser();
                      }
                      if (status && !this.user) {
                        this.userService.updateUserBySession();
                      }
                    })
                  )
                  .subscribe();
              }
              return of(true);
            }
          })
        );
    } else {
      return of(true);
    }
  }
}
