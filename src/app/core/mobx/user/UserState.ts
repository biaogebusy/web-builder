import { Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { LocalStorageService } from 'ngx-webstorage';
import type { IUser, TokenUser } from './IUser';
import { of, Subject, forkJoin } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { intersection } from 'lodash-es';

const unauthUser = {
  id: '',
  authenticated: false,
  csrf_token: '',
  current_user: {
    uid: '',
    name: '',
    roles: [],
  },
  logout_token: '',
  login: '',
};

// const unauthUser = {
//   csrf_token: 'XYnwdoW932Lhdin_jZnN0Ow7PM7VixZTzC7Lb2PAnXk',
//   current_user: {
//     uid: '1',
//     name: 'root',
//     roles: ['authenticated', 'administrator'],
//   },
//   id: '505d9929-18cc-496d-8750-2aa1d2a72c65',
//   display_name: '超管员',
//   mail: 'no-reply@xinshi.com',
//   authenticated: true,
//   picture: '/sites/amigo.zhaobg.com/files/pictures/2022-04/logo_t.png',
//   login: '2022-06-20T13:00:29+00:00',
// };

@Injectable({
  providedIn: 'root',
})
export class UserState {
  @observable private user: IUser = unauthUser;
  @observable public error = '';
  @observable public loading = false;

  user$ = new Subject<IUser>();

  constructor(
    private cryptoJS: CryptoJSService,
    private userService: UserService,
    private utilities: UtilitiesService,
    private storage: LocalStorageService
  ) {
    // this.user = unauthUser;
    // return;
    if (this.storage.retrieve(this.userService.localUserKey)) {
      this.user = JSON.parse(
        this.cryptoJS.decrypt(
          this.storage.retrieve(this.userService.localUserKey)
        )
      );
      // console.log(this.user);
    }
  }

  @computed get currentUser(): IUser {
    return Object.assign({}, this.user);
  }

  @computed get unauthUser(): IUser {
    return Object.assign({}, unauthUser);
  }

  @computed
  get authenticated(): boolean {
    return !!this.user.current_user.uid;
  }

  @computed
  get picture(): any {
    return this.user && this.user.picture;
  }

  @computed
  get roles(): string[] {
    return (this.currentUser && this.currentUser.current_user.roles) || [''];
  }

  get defaultAvatar(): string {
    return '/assets/images/avatar/default.svg';
  }

  @computed
  get logoutToken(): string {
    return (this.currentUser && this.currentUser.logout_token) || '';
  }

  @computed
  get csrfToken(): string {
    return this.currentUser && this.currentUser.csrf_token;
  }

  @action
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

  @action
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

  @action
  logout(): any {
    if (environment.drupalProxy) {
      this.logoutUser();
      window.location.href = '/user/logout';
      return;
    }
    this.userService
      .logout(this.logoutToken)
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
    this.user$.next(unauthUser);
    this.user = unauthUser;
    this.storage.clear(this.userService.localUserKey);
  }

  @action
  loginUser(data: any, user: any): void {
    this.loading = false;
    this.user$.next(user);
    this.user = Object.assign(data, user);
    this.userService.storeLocalUser(this.user);
  }

  @action
  logouLocalUser(): void {
    this.user$.next(unauthUser);
    this.user = unauthUser;
    this.storage.clear(this.userService.localUserKey);
  }

  @action
  updateUser(data: TokenUser): any {
    this.userService
      .getCurrentUserById(data.current_user.uid, data.csrf_token)
      .subscribe((user) => {
        this.loginUser(data, user);
      });
  }

  @action
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

  @action
  refreshLocalUser(user: IUser): void {
    this.user$.next(user);
    this.user = user;
    this.userService.storeLocalUser(user);
  }

  isMatchCurrentRole(roles: string[]): boolean {
    return intersection(this.roles, roles).length > 0;
  }
}
