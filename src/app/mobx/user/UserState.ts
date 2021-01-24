import { Inject, Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { IUser, TokenUser } from './IUser';
import { Subject } from 'rxjs';
import { UserService } from '../../service/user.service';
import { ApiService } from '../../service/api.service';

const unauthUser = {
  authenticated: false,
};

@Injectable()
export class UserState {
  @observable public user: IUser = unauthUser;
  @observable public error = '';
  @observable public loading = false;

  user$ = new Subject<IUser>();

  @computed get currentUser(): IUser {
    return Object.assign({}, this.user);
  }

  constructor(
    private userService: UserService,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private apiService: ApiService
  ) {
    if (this.storage.get(this.apiService.localUserKey)) {
      this.user = JSON.parse(this.storage.get(this.apiService.localUserKey));
    }
  }

  @action
  login(userName: string, passWord: string, localStorageKey: string): any {
    this.loading = true;
    this.userService.login(userName, passWord).subscribe(
      (data) => {
        this.updateUser(data, localStorageKey);
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
    this.storage.remove(this.apiService.localUserKey);
  }

  @action
  updateUser(data: TokenUser, localStorageKey: string): any {
    let userDetails = {};
    console.log(data, localStorageKey);
    this.userService.getCurrentUserById(data).subscribe((res) => {
      const id = res.id;
      this.userService.getUser(id, localStorageKey).subscribe((user) => {
        console.log(user);
        this.loading = false;
        this.user = user;
        this.user$.next(user);
        userDetails = Object.assign(data, user);
        this.storage.set(localStorageKey, JSON.stringify(userDetails));
      });
    });
  }

  @computed
  get anthenticated(): boolean {
    return !!this.user.authenticated;
  }
}
