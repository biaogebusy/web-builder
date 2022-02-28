import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from 'ngx-webstorage';
import { IApiUrl, IAppConfig, ICommerce, IPage } from './IAppConfig';
import { of, Subject } from 'rxjs';
import { TagsService } from '@core/service/tags.service';
import { version } from '../../../../package.json';
import { isArray, isEmpty } from 'lodash-es';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '@core/service/api.service';

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
    page: initPage,
  };

  public switchChange$ = new Subject();
  public responseCache = new Map();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private storage: LocalStorageService,
    private tagsService: TagsService,
    public apiService: ApiService
  ) {}

  @computed get ready(): any {
    return this._READY && this.state.config;
  }

  @computed get config(): any {
    return this.state && this.state.config;
  }

  @computed get theme(): any {
    return this.state && this.state.defTheme;
  }

  @computed get defaultLogo(): string {
    return this.config && this.config.defaultLogo;
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

  @computed get guard(): any {
    return this.state.config && this.state.config.guard;
  }

  @computed get loginLeft(): any {
    return this.state.config && this.state.config?.login?.left;
  }

  @computed get article(): any {
    return this.state.config && this.state.config.article;
  }

  @computed get commerce(): ICommerce {
    return this.state.config && this.state.config.commerce;
  }

  get actions(): any {
    return this.state.config && this.state.config?.actions;
  }

  get version(): string {
    return version;
  }

  get origin(): string {
    return this.document.location.origin;
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
    const allowKey = ['version', 'origin', 'category'];
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
  setConfig(): void {
    if (environment.production) {
      this.http
        .get(`${environment.apiUrl}/api/v1/config?content=/core/base`)
        .subscribe(
          (config) => {
            console.log('core loaded!');
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
      this.http
        .get(`${environment.apiUrl}/assets/app/core/base.json`)
        .subscribe(
          (config) => {
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
      this.state.defTheme = this.state.config.defaultTheme || 'light-theme';
      this.setBodyClasses(this.state.defTheme);
    }
  }

  @action
  setPageContent(): void {
    if (environment.production) {
      const landingPath = '/api/v1/landingPage?content=';
      console.log(`appState request start!`);
      this.http
        .get<any>(`${environment.apiUrl}${landingPath}${this.apiPath}`)
        .pipe(
          switchMap((res) => {
            if (!isEmpty(res)) {
              console.log('Has data!');
              return of(res);
            }
            console.log('No data!');
            return this.http.get<any>(`${environment.apiUrl}${landingPath}404`);
          })
        )
        .subscribe(
          (pageValue: IPage) => {
            this.updatePage(pageValue);
          },
          (error) => {
            this.setPageNotFound(`${environment.apiUrl}${landingPath}404`);
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
