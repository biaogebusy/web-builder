import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { environment } from '../../environments/environment';
import { LocalStorageService } from 'ngx-webstorage';
import { IApiUrl, IAppConfig, IPage } from './IAppConfig';
import { Subject } from 'rxjs';
import { IUser } from './user/IUser';
import { TagsService } from '../service/tags.service';
import { version } from '../../../package.json';
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
  private readonly MODE = 'themeMode';
  private _READY = true;
  @observable private state: IAppConfig = {
    defTheme: 'light-theme',
    config: null,
    currentUser: unauthUser,
    page: initPage,
  };

  public switchChange$ = new Subject();
  public configLoadDone$ = new Subject();
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document,
    private storage: LocalStorageService,
    private tagsService: TagsService
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

  @computed get apiUrlConfig(): IApiUrl {
    return this.state.config && this.state.config.apiUrl;
  }

  @computed get meta(): any {
    return this.state.page && this.state.page.meta;
  }

  @computed get pageConfig(): any {
    return this.state.page && this.state.page.config;
  }

  @computed get title(): any {
    return this.state.page && this.state.page.title;
  }

  @computed get content(): any[] {
    return this.state.page && this.state.page.body;
  }

  get version(): string {
    return version;
  }

  @action
  setConfig(): void {
    if (environment.production) {
      this.http
        .get(`${environment.apiUrl}/api/v1/config?content=/core/base`)
        .subscribe(
          (config) => {
            this.state.config = config;
            this.configLoadDone$.next(true);
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
            this.configLoadDone$.next(true);
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
    if (this.storage.retrieve(this.MODE)) {
      this.state.defTheme = this.storage.retrieve(this.MODE);
      this.setBodyClasses(this.state.defTheme);
    } else {
      this.state.defTheme = this.state.config.defaultTheme || 'light-theme';
      this.setBodyClasses(this.state.defTheme);
    }
  }

  setBodyClasses(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.classList.add(theme);
  }

  @action
  switchTheme(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.removeAttribute('class');
    body.classList.add(theme);
    this.switchChange$.next(theme);
    this.state.defTheme = theme;
    this.storage.store(this.MODE, theme);
  }

  @action
  setUser(): void {
    if (
      this.apiService.getToken(this.apiService.localUserKey, 'current_user')
    ) {
      const currentUser = JSON.parse(
        this.storage.retrieve(this.apiService.localUserKey)
      );
      this.state.currentUser = currentUser;
    }
  }

  @action
  logout(): void {
    this.state.currentUser = unauthUser;
  }

  updatePage(pageValue: IPage): void {
    this.state.page = pageValue;
    this.tagsService.updateTages(pageValue);
  }

  setPageNotFound(notFound: string): void {
    this.tagsService.setTitle('404 not found!');
    this.http.get<any>(notFound).subscribe((pageValue: IPage) => {
      this.updatePage(pageValue);
    });
  }

  get apiPath(): string {
    const path = this.document.location.pathname;
    const search = this.document.location.search;
    const allowKey = ['version', 'origin'];
    if (
      allowKey.some((key) => {
        return search.indexOf(key) > 0;
      })
    ) {
      return `${path}${search}`;
    } else {
      return path;
    }
  }

  @action
  setPageContent(): void {
    if (environment.production) {
      this.http
        .get<any>(
          `${environment.apiUrl}/api/v1/landingPage?content=${this.apiPath}`
        )
        .subscribe(
          (pageValue: IPage) => {
            if (!Array.isArray(pageValue)) {
              this.updatePage(pageValue);
            } else {
              this.setPageNotFound(
                `${environment.apiUrl}/api/v1/landingPage?content=404`
              );
            }
          },
          (error) => {
            this.setPageNotFound(
              `${environment.apiUrl}/api/v1/landingPage?content=404`
            );
          }
        );
    } else {
      this.http
        .get<any>(`${environment.apiUrl}/assets/app${this.apiPath}.json`)
        .subscribe(
          (pageValue: IPage) => {
            this.updatePage(pageValue);
          },
          (error) => {
            this.setPageNotFound(`${environment.apiUrl}/assets/app/404.json`);
          }
        );
    }
  }
}
