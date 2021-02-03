import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { environment } from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { IAppConfig } from './IAppConfig';
import { Subject } from 'rxjs';
import { IUser } from './user/IUser';
const unauthUser = {
  authenticated: false,
};
@Injectable()
export class AppState {
  private readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly MODE = 'themeMode';
  @observable private state: IAppConfig = {
    defTheme: 'light-theme',
    config: null,
    currentUser: unauthUser,
  };
  public switchChange$ = new Subject();
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.setConfig();
  }

  @computed get config(): any {
    return this.state.config;
  }

  @computed get theme(): any {
    return this.state.defTheme;
  }

  @computed get currentUser(): IUser {
    return this.state.currentUser;
  }

  @action
  setConfig(): void {
    if (environment.production) {
      this.http
        .get(
          `${this.apiService.apiUrl}${this.apiService.apiBase}/config?content=${this.apiService.coreConfigUrl}`
        )
        .subscribe(
          (config) => {
            this.state.config = config;
            this.initTheme();
            this.setUser();
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.http
        .get(
          `${this.apiService.localConfigUrl}${this.apiService.coreConfigUrl}.json`
        )
        .subscribe(
          (config) => {
            console.log(config);
            this.state.config = config;
            this.initTheme();
            this.setUser();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  @action
  initTheme(): void {
    if (this.storage.get(this.MODE)) {
      this.state.defTheme = this.storage.get(this.MODE);
      const body = this.document.getElementsByTagName('body')[0];
      body.classList.add(this.state.defTheme);
    }
  }

  @action
  switchTheme(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.removeAttribute('class');
    body.classList.add(theme);
    this.switchChange$.next(theme);
    this.state.defTheme = theme;
    this.storage.set(this.MODE, theme);
  }

  @action
  setUser(): void {
    if (
      this.apiService.getToken(this.apiService.localUserKey, 'current_user')
    ) {
      const currentUser = JSON.parse(
        this.storage.get(this.apiService.localUserKey)
      );
      this.state.currentUser = currentUser;
    }
  }

  @action
  logout(): void {
    this.state.currentUser = unauthUser;
  }
}
