import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NodeService } from '@core/service/node.service';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';

@Injectable({
  providedIn: 'root',
})
export class BuilderGuard {
  private router = inject(Router);
  private userService = inject(UserService);
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    if (this.screenService.isPlatformBrowser() && environment.production) {
      return this.nodeService.fetch(`/api/v3/landingPage`, 'content=/core/base').pipe(
        switchMap((config: ICoreConfig) => {
          const {
            guard: { defaultFrontLoginPage },
            builder: { guard },
          } = config;
          if (guard) {
            return this.userService.getLoginState().pipe(
              map(status => {
                if (status) {
                  return true;
                } else {
                  this.userService.logoutUser();
                  this.router.navigate([defaultFrontLoginPage ?? '/me/login'], {
                    queryParams: { returnUrl: state.url },
                  });
                  return false;
                }
              }),
              catchError(() => {
                this.router.navigate([defaultFrontLoginPage ?? '/me/login']);
                return of(false);
              })
            );
          } else {
            return of(true);
          }
        })
      );
    } else {
      return of(true);
    }
  }
}
