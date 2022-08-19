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
import { UserService } from '@core/service/user.service';
import { map, catchError } from 'rxjs/operators';
import { UtilitiesService } from '@core/service/utilities.service';

@Injectable({
  providedIn: 'root',
})
export class ManageGuard implements CanActivate {
  constructor(
    private router: Router,
    private userState: UserState,
    private userService: UserService,
    private uti: UtilitiesService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // TODO: change to user state
    if (this.userState.authenticated) {
      return this.userService
        .getCurrentUserProfile(this.userState.csrfToken)
        .pipe(
          catchError((res: any) => {
            console.log(res);
            return of({});
          }),
          map((user) => {
            console.log(user);
            if (!user) {
              this.router.navigate(['/home']);
              return false;
            }
            if (user?.roles?.includes('administrator')) {
              return true;
            }
            this.router.navigate(['/home']);
            return false;
          })
        );
    }
    this.router.navigate(['home']);
    return false;
  }
}
