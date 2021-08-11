import { Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { LocalStorageService } from 'ngx-webstorage';
import { IUser, TokenUser } from './IUser';
import { Subject } from 'rxjs';
import { UserService } from '../../service/user.service';
import { ApiService } from '../../service/api.service';
import { AppState } from '../AppState';
const unauthUser = {
  authenticated: false,
};

@Injectable()
export class UserState {
  @observable private user: IUser = unauthUser;
  @observable public error = '';
  @observable public loading = false;

  user$ = new Subject<IUser>();

  constructor(
    private userService: UserService,
    private storage: LocalStorageService,
    private apiService: ApiService,
    private appState: AppState
  ) {
    if (this.storage.retrieve(this.apiService.localUserKey)) {
      this.user = JSON.parse(
        this.storage.retrieve(this.apiService.localUserKey)
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

  @action
  login(userName: string, passWord: string): any {
    this.loading = true;
    this.userService.login(userName, passWord).subscribe(
      (data) => {
        this.updateUser(data);
      },
      (error) => {
        this.loading = false;
        this.error = error.error.message;
      }
    );
  }

  @action
  logout(): any {
    this.user$.next(unauthUser);
    this.user = unauthUser;
    this.userService.logout().subscribe(
      (res) => {
        this.storage.clear(this.apiService.localUserKey);
        this.appState.logout();
      },
      (error) => {
        console.log(error);
        this.storage.clear(this.apiService.localUserKey);
        this.appState.logout();
      }
    );
  }

  @action
  updateUser(data: TokenUser): any {
    let userDetails = {};
    this.userService.getCurrentUserById(data).subscribe((user) => {
      this.loading = false;
      this.user = user;
      this.user$.next(user);
      userDetails = Object.assign(data, user);
      this.storage.store(
        this.apiService.localUserKey,
        JSON.stringify(userDetails)
      );
    });
  }
}
