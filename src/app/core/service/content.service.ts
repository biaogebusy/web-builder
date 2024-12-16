import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { BUILDER_CURRENT_PAGE, CORE_CONFIG } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { isArray } from 'lodash-es';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ApiService } from '@core/service/api.service';
import type { IBranding } from '@core/interface/branding/IBranding';
import {
  footerInverse,
  defaultHeader,
  enDefaultHeader,
  enFooterInverse,
} from '@modules/builder/data/Branding.json';
import { IBuilderConfig } from '@core/interface/IBuilder';
@Injectable({
  providedIn: 'root',
})
export class ContentService extends ApiService {
  http = inject(HttpClient);
  tagsService = inject(TagsService);
  screenState = inject(ScreenState);
  apiService = inject(ApiService);
  coreConfig = inject(CORE_CONFIG);
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
    const localBranding: IBranding = {
      header: defaultHeader,
      footer: footerInverse,
    };

    const enBranding: IBranding = {
      header: enDefaultHeader,
      footer: enFooterInverse,
    };
    if (environment.production) {
      return this.http.get<IBranding>(
        `${this.apiUrl}${lang}/api/v3/landingPage?content=/core/branding`
      );
    } else {
      if (lang === '/en') {
        return of(enBranding);
      }
      return of(localBranding);
    }
  }

  loadConfig(coreConfig: object): any {
    const { lang } = this.getUrlPath(this.pageUrl);
    const configPath = environment.production
      ? `${this.apiUrl}${lang}/api/v3/landingPage?content=/core/base`
      : `${this.apiUrl}/assets/app${lang}/core/base.json`;
    return this.http
      .get(configPath)
      .pipe(
        tap((config: any) => {
          Object.assign(coreConfig, config);
        })
      )
      .toPromise()
      .then(
        (config: ICoreConfig) => {
          this.apiService.configLoadDone$.next(true);
        },
        error => {
          console.log(error);
          console.log('base json not found!');
        }
      );
  }

  loadBuilderConfig(): Observable<IBuilderConfig> {
    const { lang } = this.getUrlPath(this.pageUrl);
    return this.loadJSON(`${lang}/core/builder`);
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
