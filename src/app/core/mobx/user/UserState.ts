import { Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { LocalStorageService } from 'ngx-webstorage';
import { IUser, TokenUser } from './IUser';
import { of, Subject } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { catchError } from 'rxjs/operators';

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
};

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
    if (this.storage.retrieve(this.userService.localUserKey)) {
      this.user = JSON.parse(
        this.cryptoJS.decrypt(
          this.storage.retrieve(this.userService.localUserKey)
        )
      );
    }
  }

  @computed get currentUser(): IUser {
    return Object.assign({}, this.user);
  }

  @computed
  get authenticated(): boolean {
    return this.user.authenticated;
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
    return this.currentUser && this.currentUser.logout_token;
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
        this.user$.next(unauthUser);
        this.user = unauthUser;
        this.storage.clear(this.userService.localUserKey);
      });
  }

  @action
  logouLocalUser(): void {
    this.user$.next(unauthUser);
    this.user = unauthUser;
    this.storage.clear(this.userService.localUserKey);
  }

  @action
  updateUser(data: TokenUser): any {
    this.userService.getCurrentUserById(data).subscribe((user) => {
      this.loading = false;
      this.user$.next(user);
      this.user = Object.assign(data, user);
      this.userService.storeLocalUser(this.user);
    });
  }

  @action
  refreshLocalUser(user: IUser): void {
    this.user$.next(user);
    this.user = user;
    this.userService.storeLocalUser(user);
  }
}
