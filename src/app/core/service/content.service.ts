import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, lastValueFrom, of } from 'rxjs';
import { catchError, finalize, map, retry, shareReplay, switchMap, take, tap, timeout } from 'rxjs/operators';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ApiService } from '@core/service/api.service';
import {
  SsrRenderStateService,
  isTransientContentError,
} from '@core/service/ssr-render-state.service';
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
  private ssrRenderState = inject(SsrRenderStateService);
  private builderConfigCache: Observable<IBuilderConfig>;
  private coreConfigCache = new Map<string, Observable<ICoreConfig>>();
  private activeConfigPath = '';
  private uiuxCache: Observable<IUiux[]>;
  private uiuxRefresh$ = new BehaviorSubject<void>(undefined);
  private pageCache = new Map<string, Observable<IPage>>();
  private pageValueCache = new Map<string, IPage>();
  private brandingCache = new Map<string, Observable<IBranding>>();

  constructor() {
    super();
  }

  updatePage(pageValue: IPage): void {
    if (Array.isArray(pageValue)) {
      return;
    }
    this.tagsService.updateTags(pageValue);
    this.screenState.scroll$.next(true);
  }

  /** Public readers reject drafts and recheck CMS; builder readers retain their authorized cache. */
  loadPageContent(pageUrl = this.pageUrl, updateState = true, publicPage = false): Observable<IPage> {
    const { lang, path } = this.getUrlPath(pageUrl);
    if (environment.production) {
      const key = this.getLandingPageUrl(lang, path, publicPage ? { public: true } : {});
      if (!this.pageCache.has(key)) {
        const req$ = this.http.get<IPage>(key, publicPage ? { transferCache: false, cache: 'no-store' } : {});
        // Under SSR the global HTTP timeout covers the fallback; do not retry, so slow
        // requests do not multiply the render budget
        const withRetry$ = this.isServer || publicPage ? req$ : req$.pipe(retry({ count: 1, delay: 500 }));
        this.pageCache.set(
          key,
          withRetry$.pipe(
            map(page => {
              if (publicPage && (typeof page?.publicPageKey !== 'string' || !page.publicPageKey)) {
                throw new HttpErrorResponse({ status: 503, statusText: 'Public page verification unavailable' });
              }
              return page;
            }),
            catchError(error => {
              console.error('Failed to load page content:', error);
              this.markSsrDegraded('page-content', error);
              if (publicPage) {
                const status = error instanceof HttpErrorResponse && [403, 404].includes(error.status)
                  ? 404 : 503;
                this.ssrRenderState.setPublicPage(key, undefined, status);
                return this.loadPublicNotFoundPage(lang, path, status);
              }
              return of({} as IPage);
            }),
            tap(page => {
              this.pageValueCache.set(key, page);
              if (publicPage && !page.unavailable) {
                this.ssrRenderState.setPublicPage(key, page.publicPageKey);
              }
            }),
            // Share concurrent reads, but recheck public content on the next visit.
            finalize(() => { if (publicPage) { this.pageCache.delete(key); } }),
            shareReplay({ bufferSize: 1, refCount: publicPage })
          )
        );
      }
      return this.pageCache.get(key)!.pipe(
        tap(page => {
          if (updateState) {
            this.updatePage(page);
            this.logContent(pageUrl);
          }
        })
      );
    } else {
      const key = `${this.apiUrl}/assets/app${lang}${pageUrl}.json`;
      if (!this.pageCache.has(key)) {
        this.pageCache.set(
          key,
          this.http.get<IPage>(key).pipe(
            catchError(() => this.http.get<IPage>(`${this.apiUrl}/assets/app/404.json`)),
            tap(page => this.pageValueCache.set(key, page)),
            shareReplay(1)
          )
        );
      }
      return this.pageCache.get(key)!.pipe(
        tap(page => {
          if (updateState) {
            this.updatePage(page);
          }
        })
      );
    }
  }

  private loadPublicNotFoundPage(lang: string, path: string, status: number): Observable<IPage> {
    const fallback: IPage = { title: '', body: [], unavailable: true };
    if (status !== 404 || this.splitContentPath(path).content.replace(/\/+$/, '') === '/404') {
      return of(fallback);
    }
    const key = this.getLandingPageUrl(lang, '/404', { public: true });
    // Read directly so the fallback cannot recurse or replace the original document's 404 status.
    return this.http.get<IPage>(key, { transferCache: false, cache: 'no-store' }).pipe(
      map(page => {
        if (!page || typeof page !== 'object' || Array.isArray(page)
          || typeof page.publicPageKey !== 'string' || !page.publicPageKey
          || !Array.isArray(page.body) || !page.body.length
          || !page.body.every(item => {
            const type = item?.type ?? item?.content?.type;
            return item && typeof item === 'object' && !Array.isArray(item)
              && typeof type === 'string' && type.trim().length > 0;
          })) {
          return fallback;
        }
        // Display the published fallback without offering to edit it as the requested page.
        return {
          title: typeof page.title === 'string' ? page.title : '',
          body: page.body,
          ...(Array.isArray(page.meta) && page.meta.every(item =>
            item && typeof item === 'object' && !Array.isArray(item)) ? { meta: page.meta } : {}),
          ...(page.config && typeof page.config === 'object' && !Array.isArray(page.config)
            ? { config: page.config } : {}),
          unavailable: true,
        };
      }),
      catchError(error => {
        this.markSsrDegraded('not-found-page', error);
        return of(fallback);
      })
    );
  }

  getCachedPageContent(pageUrl = this.pageUrl, publicPage = false): IPage | undefined {
    const { lang, path } = this.getUrlPath(pageUrl);
    const key = environment.production
      ? this.getLandingPageUrl(lang, path, publicPage ? { public: true } : {})
      : `${this.apiUrl}/assets/app${lang}${pageUrl}.json`;
    return this.pageValueCache.get(key);
  }

  // Rendering continues with empty content (graceful degradation), but a
  // transient upstream failure means this render must not enter the SSR HTML
  // cache: server.ts reads the flag after the render. Stable 4xx answers
  // keep the normal caching behavior.
  private markSsrDegraded(source: string, error: unknown): void {
    if (this.isServer && isTransientContentError(error)) {
      this.ssrRenderState.markDegraded(source);
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
    const key = this.getLandingPageUrl(lang, '/core/branding');
    if (!this.brandingCache.has(key)) {
      const req$ = this.http.get<IBranding>(key);
      const resilientReq$ = this.isServer
        ? req$
        : req$.pipe(timeout(5000), retry({ count: 1, delay: 500 }));
      this.brandingCache.set(
        key,
        resilientReq$.pipe(
          catchError(error => {
            console.error('Failed to load branding:', error);
            this.markSsrDegraded('branding', error);
            // SSR keeps one request per render; browser navigation can recover later.
            if (!this.isServer && isTransientContentError(error)) {
              this.brandingCache.delete(key);
            }
            return of({} as IBranding);
          }),
          shareReplay(1)
        )
      );
    }
    return this.brandingCache.get(key)!;
  }

  loadConfig(coreConfig: object, pageUrl = this.pageUrl): Promise<void> {
    const { lang } = this.getUrlPath(pageUrl);
    const configPath = this.getLandingPageUrl(lang, '/core/base');
    this.activeConfigPath = configPath;
    if (!this.coreConfigCache.has(configPath)) {
      const req$ = this.http.get<ICoreConfig>(configPath);
      const resilientReq$ = this.isServer
        ? req$
        : req$.pipe(retry({ count: 2, delay: 1000 }));
      this.coreConfigCache.set(
        configPath,
        resilientReq$.pipe(
          catchError(error => {
            console.error('base json not found:', error);
            this.markSsrDegraded('core-config', error);
            if (!this.isServer && isTransientContentError(error)) {
              this.coreConfigCache.delete(configPath);
            }
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
      this.uiuxCache = this.uiuxRefresh$.pipe(
        switchMap(() => this.http.get<IUiux[]>(api).pipe(catchError(() => of([])))),
        shareReplay(1)
      );
    }
    return this.uiuxCache;
  }

  // Call after the component library is added/removed/updated: all UIUX consumers
  // (component panel, component management) share the same cache and receive the new data together
  reloadUIUX(): void {
    this.uiuxRefresh$.next();
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
      'Authorization': `Bearer ${token}`,
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
