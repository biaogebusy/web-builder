import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { map, catchError } from 'rxjs/operators';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';

@Injectable({
  providedIn: 'root',
})
export class ManageGuard  {
  constructor(
    private router: Router,
    private userService: UserService,
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
    if (this.user.authenticated) {
      return this.userService.getCurrentUserProfile(this.user.csrf_token).pipe(
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
