import { HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';
import { Observable, lastValueFrom, of } from 'rxjs';
import { catchError, retry, shareReplay, take, tap, timeout } from 'rxjs/operators';
import { isArray } from 'lodash-es';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ApiService } from '@core/service/api.service';
import type { IBranding } from '@core/interface/branding/IBranding';
import type { IBuilderConfig, IUiux } from '@core/interface/IBuilder';
import type { JsonValue } from '@core/interface/common';
import { appendQueryParams, queryStringToParams, QueryParams } from '@core/util/http-params.util';

export interface GithubRepository {
  html_url: string;
  stargazers_count: number;
}

@Injectable({
  providedIn: 'root',
})
export class ContentService extends ApiService {
  private tagsService = inject(TagsService);
  private screenState = inject(ScreenState);
  private apiService = inject(ApiService);
  private coreConfig = inject(CORE_CONFIG);
  private isServer = isPlatformServer(inject(PLATFORM_ID));
  private builderConfigCache: Observable<IBuilderConfig>;
  private coreConfigCache = new Map<string, Observable<ICoreConfig>>();
  private activeConfigPath = '';
  private uiuxCache: Observable<IUiux[]>;
  private pageCache = new Map<string, Observable<IPage>>();

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
      const key = this.getLandingPageUrl(lang, path);
      if (!this.pageCache.has(key)) {
        const req$ = this.http.get<IPage>(key);
        // SSR下不重试：10s超时后重试再浪费10s，导致请求堆积
        const withRetry$ = this.isServer ? req$ : req$.pipe(retry({ count: 1, delay: 500 }));
        this.pageCache.set(
          key,
          withRetry$.pipe(
            catchError(error => {
              console.error('Failed to load page content:', error);
              return of({} as IPage);
            }),
            shareReplay(1)
          )
        );
      }
      return this.pageCache.get(key)!.pipe(
        tap(page => {
          this.updatePage(page);
          this.logContent(pageUrl);
        })
      );
    } else {
      return this.http.get<IPage>(`${this.apiUrl}/assets/app${lang}${pageUrl}.json`).pipe(
        tap(page => this.updatePage(page)),
        catchError(() => this.http.get<IPage>(`${this.apiUrl}/assets/app/404.json`))
      );
    }
  }

  logContent(url: string): void {
    if (this.coreConfig?.log?.content?.enabel) {
      const { api } = this.coreConfig.log.content;
      this.http
        .get(appendQueryParams(api, { location: url }))
        .pipe(take(1))
        .subscribe();
    }
  }

  loadBranding(pageUrl = this.pageUrl): Observable<IBranding> {
    const { lang } = this.getUrlPath(pageUrl);
    return this.http.get<IBranding>(this.getLandingPageUrl(lang, '/core/branding')).pipe(
      timeout(5000),
      retry({ count: 1, delay: 500 }),
      catchError(error => {
        console.error('Failed to load branding:', error);
        return of({} as IBranding);
      })
    );
  }

  loadConfig(coreConfig: object, pageUrl = this.pageUrl): Promise<void> {
    const { lang } = this.getUrlPath(pageUrl);
    const configPath = this.getLandingPageUrl(lang, '/core/base');
    this.activeConfigPath = configPath;
    if (!this.coreConfigCache.has(configPath)) {
      this.coreConfigCache.set(
        configPath,
        this.http.get<ICoreConfig>(configPath).pipe(
          retry({ count: 2, delay: 1000 }),
          catchError(error => {
            console.error('base json not found:', error);
            return of({} as ICoreConfig);
          }),
          shareReplay(1)
        )
      );
    }
    return lastValueFrom(this.coreConfigCache.get(configPath) as Observable<ICoreConfig>)
      .then((config: ICoreConfig) => {
        if (this.activeConfigPath !== configPath) {
          return;
        }
        this.replaceConfig(coreConfig, config);
        this.apiService.configLoadDone$.next(true);
      })
      .catch(error => {
        console.error('Failed to load config, using defaults:', error);
        if (this.activeConfigPath === configPath) {
          this.apiService.configLoadDone$.next(true);
        }
      });
  }

  private replaceConfig(coreConfig: object, config: ICoreConfig): void {
    const target = coreConfig as Record<string, unknown>;
    Object.keys(target).forEach(key => {
      delete target[key];
    });
    Object.assign(target, config);
  }

  loadUIUX(): Observable<IUiux[]> {
    const { lang } = this.getUrlPath(this.pageUrl);
    const api = `${this.apiUrl}${lang}/api/v3/node/component`;
    if (!this.uiuxCache) {
      this.uiuxCache = this.http.get<IUiux[]>(api).pipe(
        catchError(() => of([])),
        shareReplay(1)
      );
    }
    return this.uiuxCache;
  }

  loadBuilderConfig(): Observable<IBuilderConfig> {
    if (!this.builderConfigCache) {
      const { lang } = this.getUrlPath(this.pageUrl);
      this.builderConfigCache = this.loadJSON<IBuilderConfig>(`${lang}/core/builder`).pipe(
        shareReplay(1)
      );
    }
    return this.builderConfigCache;
  }

  loadJSON<T extends JsonValue | object = JsonValue>(jsonPath: string): Observable<T> {
    const { lang, path } = this.getUrlPath(jsonPath);
    const apiPath = environment.production
      ? this.getLandingPageUrl(lang, path, { nocache: true })
      : `${this.apiUrl}/assets/app${lang}${path}.json`;

    return this.http.get<T>(apiPath);
  }

  private getLandingPageUrl(lang: string, contentPath: string, params: QueryParams = {}): string {
    const { content, queryParams } = this.splitContentPath(contentPath);
    return appendQueryParams(`${this.apiUrl}${lang}/api/v3/landingPage`, {
      content,
      ...queryParams,
      ...params,
    });
  }

  private splitContentPath(contentPath: string): { content: string; queryParams: QueryParams } {
    const [content, ...queryParts] = contentPath.split('&');
    return {
      content,
      queryParams: queryParts.length > 0 ? queryStringToParams(queryParts.join('&')) : {},
    };
  }

  setBodyClasses(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.classList.add(theme);
  }

  getRepository(owner: string, repo: string, token: string): Observable<GithubRepository> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .get<GithubRepository>(`https://api.github.com/repos/${owner}/${repo}`, {
        headers,
      })
      .pipe(
        catchError(() => {
          return of({
            html_url: '',
            stargazers_count: 0,
          });
        })
      );
  }
}
