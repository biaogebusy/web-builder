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
import { catchError, map, switchMap } from 'rxjs/operators';
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
    return this.nodeService.search(`/api/v1/config`, 'content=/core/base').pipe(
      switchMap((config: ICoreConfig) => {
        const guardConfig = config.guard;
        if (state.url.startsWith('/my') || guardConfig?.authGuard) {
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
                this.userService.logouLocalUser();
                if (environment?.drupalProxy) {
                  window.location.href =
                    guardConfig.defaultDrupalLoginPage || '/user/login';
                  return false;
                } else {
                  this.router.navigate(
                    [guardConfig.defaultFrontLoginPage || '/me/login'],
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
                  guardConfig.defaultDrupalLoginPage || '/user/login';
                return of(false);
              } else {
                this.router.navigate([
                  guardConfig.defaultFrontLoginPage || '/me/login',
                ]);
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
