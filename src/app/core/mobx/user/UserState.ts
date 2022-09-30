import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { of, Subject, forkJoin } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { intersection } from 'lodash-es';
import { IUser, TokenUser } from '@core/interface/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserState {
  public error = '';
  public loading = false;

  userSub$ = new Subject<IUser | boolean>();

  constructor(
    private userService: UserService,
    private utilities: UtilitiesService,
    private storage: LocalStorageService
  ) {}

  login(userName: string, passWord: string): any {
    this.loading = true;
    this.userService.login(userName, passWord).subscribe(
      (data) => {
        this.updateUser(data);
      },
      (error) => {
        this.loading = false;
        this.error = error.message;
      }
    );
  }

  loginByPhone(phone: number, code: string): any {
    this.loading = true;
    this.userService.loginByPhone(phone, code).subscribe(
      (data) => {
        if (data.status) {
          this.updateUser(data);
        } else {
          this.utilities.openSnackbar(data.message);
          this.loading = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout(logouToken: string): any {
    if (environment.drupalProxy) {
      this.logoutUser();
      window.location.href = '/user/logout';
      return;
    }
    this.userService
      .logout(logouToken)
      .pipe(
        catchError((error) => {
          if (error.status === 403) {
            return of(true);
          }
          console.log('退出异常！');
          return of(false);
        })
      )
      .subscribe(() => {
        this.logoutUser();
      });
  }

  logoutUser(): void {
    this.userSub$.next(false);
    this.storage.clear(this.userService.localUserKey);
  }

  loginUser(data: any, user: any): void {
    this.loading = false;
    this.userSub$.next(user);
    const currentUser = Object.assign(data, user);
    this.userService.storeLocalUser(currentUser);
  }

  logouLocalUser(): void {
    this.userSub$.next(false);
    this.storage.clear(this.userService.localUserKey);
  }

  updateUser(data: TokenUser): any {
    this.userService
      .getCurrentUserById(data.current_user.uid, data.csrf_token)
      .subscribe((user) => {
        this.loginUser(data, user);
      });
  }

  updateUserBySession(): void {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      }),
      withCredentials: true,
    };
    const sesstion = this.userService.http.get('/session/token', {
      responseType: 'text',
    });
    const profile = this.userService.http.get(
      '/api/v1/accountProfile',
      options
    );
    let tokenUser = {};
    forkJoin({
      csrf_token: sesstion,
      current_user: profile,
    })
      .pipe(
        switchMap((data: any) => {
          tokenUser = data;
          return this.userService.getCurrentUserById(
            data.current_user.uid,
            data.csrf_token
          );
        }),
        catchError((error: any) => {
          console.log(error);
          return of(null);
        })
      )
      .subscribe((user) => {
        console.log('get session user done!');
        this.loginUser(tokenUser, user);
      });
  }

  refreshLocalUser(user: IUser): void {
    this.userSub$.next(user);
    this.userService.storeLocalUser(user);
  }

  isMatchCurrentRole(roles: string[], currentUserRoles: string[]): boolean {
    return intersection(currentUserRoles, roles).length > 0;
  }
}
