import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { action, observable, computed } from 'mobx-angular';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import type { IAppConfig } from './IAppConfig';
import { Subject } from 'rxjs';
import { version } from '../../../../package.json';
import { ApiService } from '@core/service/api.service';
import { API_URL } from '@core/token/token-providers';

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

  @action
  switchTheme(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.removeAttribute('class');
    body.classList.add(theme);
    this.switchChange$.next(theme);
    this.state.defTheme = theme;
    this.storage.store(this.MODE, theme);
  }
}
