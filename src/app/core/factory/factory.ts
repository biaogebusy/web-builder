import { NavigationEnd, Router } from '@angular/router';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { Observable, firstValueFrom, forkJoin, from, interval, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentState } from '@core/state/ContentState';
import { LocalStorageService } from 'ngx-webstorage';
import { IBranding } from '../interface/branding/IBranding';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
import { INotify } from '@core/interface/widgets/IWidgets';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';
import { NotifyService } from '@core/service/notify.service';
import { ScreenService } from '@core/service/screen.service';
import { NodeService } from '@core/service/node.service';
import { IManageAssets } from '@core/interface/manage/IManage';
import { ILanguage } from '@core/interface/IEnvironment';
import { CookieService } from 'ngx-cookie-service';
import { ComponentService } from '@core/service/component.service';
import { DestroyRef, DOCUMENT, inject, Injector, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { getFileType } from '@core/util/file-type.util';
import { CORE_CONFIG } from '@core/token/token-providers';
import { resolveTheme, THEMKEY } from '@core/util/theme.util';
import { ThemeService } from '@core/service/theme.service';

export { THEMKEY } from '@core/util/theme.util';

/** Options for {@link pageContentFactory}. */
export interface IPageContentFactoryOptions {
  /**
   * Also follow `/builder/<alias>` URLs. The builder workspace renders
   * CMS-driven custom pages (e.g. `/builder/conversations`) through its own
   * PAGE_CONTENT, while the public PageComponent must keep skipping them.
   */
  builderPages?: boolean;
}

export function pageContentFactory(
  options: IPageContentFactoryOptions = {}
): WritableSignal<IPage | undefined | false> {
  const router = inject(Router);
  const contentService = inject(ContentService);
  const contentState = inject(ContentState);
  const componentService = inject(ComponentService);
  const destroyRef = inject(DestroyRef);
  const coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  const initialPageUrl = getInitialPageUrl(contentService.pageUrl);
  const cachedPage = contentService.getCachedPageContent(initialPageUrl);
  const pageContent = signal<IPage | undefined | false>(cachedPage ?? false);
  if (cachedPage) {
    contentState.pageConfig.set(cachedPage.config);
  }
  router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(event => (event ? contentService.pageUrl : initialPageUrl)),
      distinctUntilChanged(),
      // Angular caches route-level injectors on the route config, so this
      // subscription outlives PageComponent and keeps seeing every navigation.
      // Without the guard, entering /builder or /me fetches CMS content for
      // that URL and updateTags() overwrites the title the route just set.
      filter(
        pageUrl =>
          shouldPreloadPageComponents(pageUrl) ||
          (!!options.builderPages && isBuilderCustomPageUrl(pageUrl))
      ),
      switchMap(pageUrl => {
        return forkJoin({
          config: from(contentService.loadConfig(coreConfig, pageUrl)),
          page: contentService.loadPageContent(pageUrl),
        }).pipe(
          switchMap(({ page }) =>
            from(componentService.preloadComponentTypes(page)).pipe(map(() => page))
          )
        );
      }),
      takeUntilDestroyed(destroyRef)
    )
    .subscribe(page => {
      if (page) {
        pageContent.set(page);
        contentState.pageConfig.set(page.config);
      }
    });
  return pageContent;
}

export function notifyFactory(coreConfig: ICoreConfig): WritableSignal<INotify[] | boolean> {
  const notifyService = inject(NotifyService);
  const destroyRef = inject(DestroyRef);
  const notify = signal<INotify[] | boolean>(false);
  const apis = coreConfig?.notify?.api;

  if (apis) {
    const intervalTime = coreConfig?.notify?.params.interval || 2 * 60 * 1000;
    const source = interval(intervalTime);

    source
      .pipe(
        startWith(0),
        switchMap(() => notifyService.getWatchList()),
        map(res => {
          let lists: INotify[] = [];
          Object.keys(res).forEach((item: any) => {
            const message = res[item].rows.map((list: any) => ({
              link: {
                href: list.url,
                label: list.title,
              },
              icon: {
                svg: apis[item].icon,
                inline: true,
                color: apis[item].color,
              },
              message: list.message,
              date: list.date,
              action: apis[item].action,
              uuid: list.uuid,
            }));
            lists = [...message];
          });
          return lists;
        }),
        takeUntilDestroyed(destroyRef)
      )
      .subscribe((res: INotify[]) => {
        notify.set(res);
      });
  } else {
    notify.set(false);
  }

  return notify;
}

export const apiUrlFactory = () => {
  return environment.apiUrl;
};

export function initApp(coreConfig: object): any {
  const contentService = inject(ContentService);
  const componentService = inject(ComponentService);
  const injector = inject(Injector);
  componentService.registerDynamicComponent();
  return async () => {
    await contentService.loadConfig(coreConfig);
    // Resolve legacy seed-only palettes before rendering; stored vars need no generator.
    await injector.get(ThemeService).initTheme();
  };
}

export function preloadInitialDynamicComponents(): Promise<void> {
  const contentService = inject(ContentService);
  const componentService = inject(ComponentService);
  const pageUrl = getInitialPageUrl(contentService.pageUrl);

  if (!shouldPreloadPageComponents(pageUrl)) {
    return Promise.resolve();
  }

  return firstValueFrom(
    forkJoin({
      branding: contentService.loadBranding(pageUrl),
      page: contentService.loadPageContent(pageUrl, false),
    })
  )
    .then(content => componentService.preloadComponentTypes(content))
    .catch(error => {
      console.error('Failed to preload initial dynamic components:', error);
    });
}

export function shouldPreloadPageComponents(pageUrl: string): boolean {
  return !/^\/(?:(?:en\/)?builder|me|my|preview)(?:\/|$)/i.test(getPathname(pageUrl));
}

/**
 * True for `/builder/<alias>` URLs, which the builder workspace serves from the
 * CMS through its `**` catch-all route. `/builder` itself is the workspace
 * landing route and has no CMS page behind it.
 */
export function isBuilderCustomPageUrl(pageUrl: string): boolean {
  return /^\/(?:en\/)?builder\/.+/i.test(getPathname(pageUrl));
}

function getPathname(pageUrl: string): string {
  return pageUrl.split(/[?&]/, 1)[0];
}

function getInitialPageUrl(pageUrl: string): string {
  return pageUrl === '/' ? '/home' : pageUrl;
}

export function langFactory(): ILanguage | undefined {
  const contentService = inject(ContentService);
  const screenService = inject(ScreenService);
  const doc = inject(DOCUMENT);
  if (screenService.isPlatformBrowser()) {
    return contentService.getLang(doc.location.pathname);
  } else {
    return undefined;
  }
}

export function themeFactory(coreConfig: ICoreConfig): string {
  const storage = inject(LocalStorageService);
  return resolveTheme(coreConfig, storage.retrieve(THEMKEY));
}

export function brandingFactory(): Observable<IBranding> {
  const contentService = inject(ContentService);
  const componentService = inject(ComponentService);
  const coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  const router = inject(Router);

  return router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith(null),
    map(event => event?.urlAfterRedirects ?? contentService.pageUrl),
    distinctUntilChanged(
      (prev, curr) => contentService.getUrlPath(prev).lang === contentService.getUrlPath(curr).lang
    ),
    switchMap(pageUrl =>
      from(contentService.loadConfig(coreConfig, pageUrl)).pipe(
        switchMap(() => contentService.loadBranding(pageUrl)),
        switchMap(branding =>
          from(componentService.preloadComponentTypes(branding)).pipe(map(() => branding))
        )
      )
    ),
    shareReplay({ bufferSize: 1, refCount: false })
  );
}

export function userFactory(): WritableSignal<IUser | boolean> {
  const userService = inject(UserService);
  const destroyRef = inject(DestroyRef);
  const user = signal<IUser | boolean>(false);
  const stored = userService.getStoredUser();
  if (stored) {
    user.set(stored);
  }
  userService.userSub$.pipe(takeUntilDestroyed(destroyRef)).subscribe(u => {
    user.set(u);
  });
  return user;
}

/** Load the latest media page; true indicates loading and false an absent or failed result. */
export function mediaAssetsFactory(): WritableSignal<IManageAssets | boolean> {
  const api = '/api/v2/media';
  const nodeService = inject(NodeService);
  const contentState = inject(ContentState);
  const userService = inject(UserService);
  const cookieService = inject(CookieService);
  const key = userService.localUserKey;
  const destroyRef = inject(DestroyRef);
  const assets = signal<IManageAssets | boolean>(false);
  let noCache = false;
  if (cookieService.check(key)) {
    noCache = true;
  }
  contentState.mediaAssetsFormChange$
    .pipe(
      switchMap(value => {
        assets.set(true);
        const params = nodeService.getApiParams({ ...value, noCache });
        return nodeService.fetch(api, params).pipe(
          take(1),
          map(res => ({
            rows: res.rows.map((item: any) => {
              const type = getFileType(item.source);
              return {
                ...item,
                src: type === 'svg' ? item.source : item.thumb,
                title: decodeURIComponent(item.title),
              };
            }),
            pager: nodeService.handlePager(res.pager, res.rows.length),
          })),
          catchError(() => of(false))
        );
      }),
      takeUntilDestroyed(destroyRef)
    )
    .subscribe(result => assets.set(result));

  return assets;
}

export function getBuilderConfig(): Observable<IBuilderConfig> {
  return inject(ContentService).loadBuilderConfig();
}

export function uiuxFactory(): Observable<any[]> {
  return inject(ContentService).loadUIUX();
}
