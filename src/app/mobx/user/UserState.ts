import { Inject, Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { IUser } from './IUser';
import { ApiService } from '../../service/api.service';
import { first } from 'rxjs/operators';

const unauthUser = {
  authenticated: false,
};

@Injectable()
export class UserState {
  @observable public user: IUser = unauthUser;
  @observable public error = '';
  @observable public loading = false;

  @computed get currentUser(): IUser {
    return Object.assign({}, this.user);
  }

  constructor(
    private apiService: ApiService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    if (this.storage.get('currentUser')) {
      this.user = JSON.parse(this.storage.get('currentUser'));
    }
  }

  @action
  login(userName: string, passWord: string, item: string): any {
    this.loading = true;
    this.apiService.login(userName, passWord).subscribe(data => {
      this.updateUser(data, item);
    },
      error => {
        console.log(error)
        this.loading = false;
        this.error = error.error.message;
      });
  }

  @action
  updateUser(data: any, item: string): any {
    let userDetails = {};
    this.apiService.getCurrentUserId(data.current_user.uid).subscribe(res => {
      console.log(res)
      const id = res.id;
      this.apiService.getUser(id, item).subscribe(user => {
        this.loading = false;
        this.user = user;
        userDetails = Object.assign(data, user);
        console.log(userDetails)
        this.storage.set(item, JSON.stringify(userDetails));
      });
    });
  }

  @computed
  get anthenticated() {
    return this.user.authenticated;
  }
}
