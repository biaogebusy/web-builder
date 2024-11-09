import { Inject, Injectable, inject } from '@angular/core';
import {
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
import { ScreenService } from '@core/service/screen.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  user: IUser;
  router = inject(Router);
  userService = inject(UserService);
  nodeService = inject(NodeService);
  screenService = inject(ScreenService);

  constructor(@Inject(USER) private currentUser$: Observable<IUser>) {
    this.currentUser$.subscribe(user => {
      this.user = user;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;
    if (this.screenService.isPlatformBrowser() && environment.production) {
      return this.nodeService
        .fetch(`/api/v3/landingPage`, 'content=/core/base')
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
                map(status => {
                  // console.log('userState:', status);
                  if (status) {
                    if (environment?.drupalProxy) {
                      if (!this.user.csrf_token) {
                        this.userService.updateUserBySession();
                      }
                    }
                    return true;
                  } else {
                    this.userService.logoutUser();
                    if (environment?.drupalProxy) {
                      window.location.href =
                        defaultDrupalLoginPage ?? '/user/login';
                      return false;
                    } else {
                      this.router.navigate(
                        [defaultFrontLoginPage ?? '/me/login'],
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
                      defaultDrupalLoginPage ?? '/user/login';
                    return of(false);
                  } else {
                    this.router.navigate([
                      defaultFrontLoginPage ?? '/me/login',
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
                    tap(status => {
                      if (!status) {
                        this.userService.logoutUser();
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
