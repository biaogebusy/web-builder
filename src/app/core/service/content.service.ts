import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';
import { Observable, lastValueFrom, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { isArray } from 'lodash-es';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ApiService } from '@core/service/api.service';
import type { IBranding } from '@core/interface/branding/IBranding';
import { IBuilderConfig } from '@core/interface/IBuilder';
@Injectable({
  providedIn: 'root',
})
export class ContentService extends ApiService {
  private http = inject(HttpClient);
  private tagsService = inject(TagsService);
  private screenState = inject(ScreenState);
  private apiService = inject(ApiService);
  private coreConfig = inject(CORE_CONFIG);
  private builderConfigCache: Observable<IBuilderConfig>;
  private coreConfigCache: Observable<ICoreConfig>;

  constructor() {
    super();
  }

  updatePage(pageValue: IPage): void {
    if (isArray(pageValue)) {
      return;
    }
    this.tagsService.updateTages(pageValue);
    this.screenState.scroll$.next(true);
  }

  loadPageContent(pageUrl = this.pageUrl): Observable<IPage> {
    const { lang, path } = this.getUrlPath(pageUrl);
    if (environment.production) {
      const landingPath = '/api/v3/landingPage?content=';
      const pageUrlParams = `${this.apiUrl}${lang}${landingPath}${path}`;
      return this.http.get<any>(pageUrlParams).pipe(
        tap(page => {
          this.updatePage(page);
          this.logContent(pageUrl);
        }),
        catchError(() => {
          return this.http.get<any>(`${this.apiUrl}${landingPath}/404`);
        })
      );
    } else {
      return this.http.get<any>(`${this.apiUrl}/assets/app${lang}${pageUrl}.json`).pipe(
        tap(page => {
          this.updatePage(page);
        }),
        catchError(() => {
          return this.http.get<any>(`${this.apiUrl}/assets/app/404.json`);
        })
      );
    }
  }

  logContent(url: string): void {
    if (this.coreConfig?.log?.content?.enabel) {
      const { api } = this.coreConfig.log.content;
      this.http.get(`${api}?location=${url}`).subscribe();
    }
  }

  loadBranding(): Observable<IBranding> {
    const { lang } = this.getUrlPath(this.pageUrl);
    return this.http.get<IBranding>(
      `${this.apiUrl}${lang}/api/v3/landingPage?content=/core/branding`
    );
  }

  loadConfig(coreConfig: object): any {
    const { lang } = this.getUrlPath(this.pageUrl);
    const configPath = `${this.apiUrl}${lang}/api/v3/landingPage?content=/core/base`;
    if (!this.coreConfigCache) {
      this.coreConfigCache = this.http.get<ICoreConfig>(configPath).pipe(shareReplay(1));
    }
    return lastValueFrom(this.coreConfigCache).then(
      (config: ICoreConfig) => {
        Object.assign(coreConfig, config);
        this.apiService.configLoadDone$.next(true);
      },
      error => {
        console.log(error);
        console.log('base json not found!');
      }
    );
  }

  loadBuilderConfig(): Observable<IBuilderConfig> {
    if (!this.builderConfigCache) {
      const { lang } = this.getUrlPath(this.pageUrl);
      this.builderConfigCache = this.loadJSON(`${lang}/core/builder`).pipe(shareReplay(1));
    }
    return this.builderConfigCache;
  }

  loadJSON(jsonPath: string): Observable<any> {
    const { lang, path } = this.getUrlPath(jsonPath);
    const apiPath = environment.production
      ? `${this.apiUrl}${lang}/api/v3/landingPage?content=${path}&nocache=true`
      : `${this.apiUrl}/assets/app${lang}${path}.json`;

    return this.http.get<any>(apiPath);
  }

  setBodyClasses(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.classList.add(theme);
  }

  getRepository(owner: string, repo: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .get(`https://api.github.com/repos/${owner}/${repo}`, {
        headers,
      })
      .pipe(
        map((rep: any) => {
          return rep;
        }),
        catchError(err => {
          return of({
            html_url: '',
            stargazers_count: 0,
          });
        })
      );
  }
}
