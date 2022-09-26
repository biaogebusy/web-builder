import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import type { IAppConfig, ICoreConfig, IPage } from './IAppConfig';
import { Subject } from 'rxjs';
import { TagsService } from '@core/service/tags.service';
import { version } from '../../../../package.json';
import { isArray } from 'lodash-es';
import { ApiService } from '@core/service/api.service';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { tap } from 'rxjs/operators';
import { API_URL } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';

const initPage = {
  title: '',
  body: [],
};
@Injectable({
  providedIn: 'root',
})
export class AppState {
  private readonly MODE = 'themeMode';
  @observable private state: IAppConfig = {
    defTheme: 'light-theme',
    config: null,
    page: initPage,
  };

  public switchChange$ = new Subject();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private storage: LocalStorageService,
    private tagsService: TagsService,
    public apiService: ApiService,
    private screenState: ScreenState,
    @Inject(API_URL) private apiUrl: string
  ) {}

  @computed get config(): any {
    return this.state && this.state.config;
  }

  @computed get theme(): any {
    return this.state && this.state.defTheme;
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

  get defaultThumb(): string {
    return (
      (this.state.config && this.state.config?.defaultThumb) ||
      '/assets/images/default.png'
    );
  }

  setBodyClasses(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.classList.add(theme);
  }

  updatePage(pageValue: IPage): void {
    if (isArray(pageValue)) {
      return;
    }
    this.state.page = pageValue;
    this.tagsService.updateTages(pageValue);
    this.screenState.scroll$.next();
  }

  setPageNotFound(notFound: string): void {
    this.tagsService.setTitle('404 not found!');
    this.http.get<any>(notFound).subscribe((pageValue: IPage) => {
      this.updatePage(pageValue);
    });
  }

  get apiPath(): string {
    const location = this.document.location;
    const path = location.pathname;
    const search = location.search;
    const allowKey = ['version', 'origin', 'category', 'preview'];
    if (
      allowKey.some((key) => {
        return search.indexOf(key) > 0;
      })
    ) {
      const params = search.split('?')[1];
      return `${path}&${params}`;
    } else {
      return path;
    }
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
  public loadConfig(coreConfig: object): any {
    if (environment.production) {
      return this.http
        .get(`${this.apiUrl}/api/v1/config?content=/core/base`)
        .pipe(
          tap((config: any) => {
            Object.assign(coreConfig, config);
          })
        )
        .toPromise()
        .then(
          (config: ICoreConfig) => {
            this.state.config = config;
            this.apiService.configLoadDone$.next(true);
            this.initTheme();
          },
          (error) => {
            console.log(error);
            console.log('base json not found!');
          }
        );
    } else {
      return this.http
        .get(`${this.apiUrl}/assets/app/core/base.json`)
        .pipe(
          tap((config: any) => {
            Object.assign(coreConfig, config);
          })
        )
        .toPromise()
        .then(
          (config: ICoreConfig) => {
            this.state.config = config;
            this.apiService.configLoadDone$.next(true);
            this.initTheme();
          },
          () => {
            console.log('base json not found!');
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
      this.state.defTheme = this.config.defaultTheme || 'light-theme';
      this.setBodyClasses(this.state.defTheme);
    }
  }

  @action
  loadPageContent(): void {
    if (environment.production) {
      const landingPath = '/api/v1/landingPage?content=';
      this.http
        .get<any>(`${this.apiUrl}${landingPath}${this.apiPath}`)
        .subscribe(
          (pageValue: IPage) => {
            this.updatePage(pageValue);
          },
          (error) => {
            this.setPageNotFound(`${this.apiUrl}${landingPath}404`);
          }
        );
    } else {
      this.http
        .get<any>(`${this.apiUrl}/assets/app${this.apiPath}.json`)
        .subscribe(
          (pageValue: IPage) => {
            this.updatePage(pageValue);
          },
          (error) => {
            this.setPageNotFound(`${this.apiUrl}/assets/app/404.json`);
          }
        );
    }
  }
}
