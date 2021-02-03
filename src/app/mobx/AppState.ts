import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { environment } from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { IApiUrl, IAppConfig } from './IAppConfig';
import { Subject } from 'rxjs';
import { IUser } from './user/IUser';

const unauthUser = {
  authenticated: false,
};
@Injectable({
  providedIn: 'root'
})

export class AppState {
  private readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly MODE = 'themeMode';
  private _READY = true;
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

  @computed get ready(): any {
    return this._READY && this.state.config;
  }

  @computed get config(): any {
    return this.state && this.state.config;
  }

  @computed get theme(): any {
    return this.state && this.state.defTheme;
  }

  @computed get currentUser(): IUser {
    return this.state && this.state.currentUser;
  }

  @computed get apiUrl(): IApiUrl {
    return this.state.config && this.state.config.apiUrl;
  }

  @action
  setConfig(): void {
    if (environment.production) {
      this.http
        .get(
          `${environment.apiUrl}/api/v1/config?content=/core/base`
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
          `${environment.apiUrl}/assets/app/core/base.json`
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
