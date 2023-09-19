import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { isArray } from 'lodash-es';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ApiService } from '@core/service/api.service';
import type { IBranding } from '@core/interface/branding/IBranding';
import {
  defaultHeader,
  footerInverse,
  manageHeader,
} from '@stories/global/Branding.json';
import { samples } from '@modules/builder/data/samples-for-builder';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(
    private http: HttpClient,
    private tagsService: TagsService,
    private screenState: ScreenState,
    private apiService: ApiService,
    @Inject(API_URL) private apiUrl: string,
    @Inject(DOCUMENT) private document: Document,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  updatePage(pageValue: IPage): void {
    if (isArray(pageValue)) {
      return;
    }
    this.tagsService.updateTages(pageValue);
    this.screenState.scroll$.next(true);
  }

  get pageUrl(): string {
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

  loadPageContent(pageUrl = this.pageUrl): Observable<IPage> {
    if (environment.production) {
      const landingPath = '/api/v1/landingPage?content=';
      const pageUrlParams = `${this.apiUrl}${landingPath}${pageUrl}`;
      console.log(this.coreConfig);
      return this.http.get<any>(pageUrlParams).pipe(
        tap((page) => {
          this.updatePage(page);
          this.logContent(pageUrl);
        }),
        catchError(() => {
          return this.http.get<any>(`${this.apiUrl}${landingPath}404`);
        })
      );
    } else {
      const sample = pageUrl.split('/')[1];
      const samplePage = samples.elements.filter(
        (item) => item.id === sample
      )[0];
      if (samplePage) {
        this.updatePage(samplePage.page);
        return of(samplePage.page);
      } else {
        return this.http.get<any>(`${this.apiUrl}/assets/app/404.json`);
      }
    }
  }

  logContent(url: string): void {
    if (this.coreConfig?.log?.content?.enabel) {
      const { api } = this.coreConfig.log.content;
      this.http.get(`${api}?location=${url}`).subscribe();
    }
  }

  loadBranding(): Observable<IBranding> {
    const localBranding: IBranding = {
      header: manageHeader,
      footer: footerInverse,
    };
    if (environment.production) {
      return this.http.get<IBranding>(
        `${this.apiUrl}/api/v1/config?content=/core/branding`
      );
    } else {
      return of(localBranding);
    }
  }

  loadConfig(coreConfig: object): any {
    const configPath = environment.production
      ? `${this.apiUrl}/api/v1/config?content=/core/base`
      : `${this.apiUrl}/assets/app/core/base.json`;
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
        (error) => {
          console.log(error);
          console.log('base json not found!');
        }
      );
  }

  setBodyClasses(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.classList.add(theme);
  }

  getRepository(owner: string, repo: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
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
        catchError((err) => {
          return of({
            html_url: '',
            stargazers_count: 0,
          });
        })
      );
  }
}
