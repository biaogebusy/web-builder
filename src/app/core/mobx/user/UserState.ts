import { Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { LocalStorageService } from 'ngx-webstorage';
import { IUser, TokenUser } from './IUser';
import { Subject } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { AppState } from '../AppState';
import { UtilitiesService } from '@core/service/utilities.service';
import { CryptoJSService } from '@core/service/crypto-js.service';
const unauthUser = {
  authenticated: false,
  csrf_token: '',
  current_user: {
    uid: '',
    name: '',
    roles: [],
  },
  logout_token: '',
};

@Injectable()
export class UserState {
  @observable private user: IUser = unauthUser;
  @observable public error = '';
  @observable public loading = false;

  user$ = new Subject<IUser>();

  constructor(
    private appState: AppState,
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
  get anthenticated(): boolean {
    return !!this.user.authenticated;
  }

  @computed
  get picture(): any {
    return this.user && this.user.picture;
  }

  @computed
  get roles(): string[] {
    return this.currentUser && this.currentUser.current_user.roles;
  }

  get defaultAvatar(): string {
    return '/assets/images/avatar/default.svg';
  }

  get logoutToken(): string {
    return this.currentUser && this.currentUser.logout_token;
  }

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
    this.user$.next(unauthUser);
    this.user = unauthUser;
    this.userService.logout(this.logoutToken).subscribe(
      () => {
        this.storage.clear(this.userService.localUserKey);
      },
      (error) => {
        console.log(error);
        this.storage.clear(this.userService.localUserKey);
      }
    );
  }

  @action
  updateUser(data: TokenUser): any {
    this.userService
      .getCurrentUserById(data, this.csrfToken)
      .subscribe((user) => {
        this.loading = false;
        this.user$.next(user);
        this.user = Object.assign(data, user);
        this.storage.store(
          this.userService.localUserKey,
          this.cryptoJS.encrypt(JSON.stringify(this.user))
        );
      });
  }
}
