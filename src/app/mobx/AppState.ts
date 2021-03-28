import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { environment } from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { IApiUrl, IAppConfig, IPage } from './IAppConfig';
import { Subject } from 'rxjs';
import { IUser } from './user/IUser';
import { Router } from '@angular/router';
import { TitleService } from '../service/title.service';

const unauthUser = {
  authenticated: false,
};

const initPage = {
  title: '',
  body: [],
};
@Injectable({
  providedIn: 'root',
})
export class AppState {
  private readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly MODE = 'themeMode';
  private _READY = true;
  @observable private state: IAppConfig = {
    defTheme: 'light-theme',
    config: null,
    currentUser: unauthUser,
    page: initPage,
  };

  public switchChange$ = new Subject();
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private titleService: TitleService
  ) {
    this.setConfig();
    console.log(this.router);
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

  @computed get meta(): any {
    return this.state.page && this.state.page.meta;
  }

  @computed get title(): any {
    return this.state.page && this.state.page.title;
  }

  @computed get content(): any[] {
    return this.state.page && this.state.page.body;
  }

  @action
  setConfig(): void {
    if (environment.production) {
      this.http
        .get(`${environment.apiUrl}/api/v1/config?content=/core/base`)
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
        .get(`${environment.apiUrl}/assets/app/core/base.json`)
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

  updatePage(pageValue: IPage, title: string): void {
    this.state.page = pageValue;
    this.titleService.setTitle(title);
  }

  setPageNotFound(): void {
    console.log('404 not found!');
    this.titleService.setTitle('404 not found!');
    this.state.page.body[0] = {
      type: '404',
    };
  }

  @action
  setPageContent(): void {
    const path = this.router.url;
    // tmp solution
    if (environment.production) {
      this.http
        .get<any>(
          `${environment.apiUrl}${this.apiUrl.apiBase}/landingPage?content=${path}`
        )
        .subscribe(
          (pageValue: IPage) => {
            this.updatePage(pageValue, pageValue?.title);
          },
          (error) => {
            this.setPageNotFound();
          }
        );
    } else {
      this.http
        .get<any>(
          `${environment.apiUrl}${this.apiUrl.localSampleUrl}${path}.json`
        )
        .subscribe(
          (pageValue: IPage) => {
            this.updatePage(pageValue, pageValue?.title);
          },
          (error) => {
            this.setPageNotFound();
          }
        );
    }
  }
}
