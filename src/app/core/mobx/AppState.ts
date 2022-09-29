import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import type { IAppConfig, ICoreConfig } from './IAppConfig';
import { Subject } from 'rxjs';
import { version } from '../../../../package.json';
import { ApiService } from '@core/service/api.service';
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
    public apiService: ApiService,
    @Inject(API_URL) private apiUrl: string
  ) {}

  @computed get config(): any {
    return this.state && this.state.config;
  }

  @computed get theme(): any {
    return this.state && this.state.defTheme;
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
}
