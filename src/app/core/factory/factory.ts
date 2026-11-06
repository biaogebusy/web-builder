import { NavigationEnd, Router } from '@angular/router';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { EMPTY, Observable, firstValueFrom, forkJoin, from, fromEvent, interval, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
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
  mergeWith,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';
import { NotifyService } from '@core/service/notify.service';
import { ScreenService } from '@core/service/screen.service';
import { NodeService } from '@core/service/node.service';
import { ILanguage } from '@core/interface/IEnvironment';
import { CookieService } from 'ngx-cookie-service';
import { ComponentService } from '@core/service/component.service';
import { DestroyRef, DOCUMENT, inject, Injector, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IBuilderConfig } from '@core/interface/IBuilder';
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
  const doc = inject(DOCUMENT);
  const browser = isPlatformBrowser(inject(PLATFORM_ID));
  const revisit$ = browser && doc.defaultView
    ? fromEvent(doc.defaultView, 'focus').pipe(
        mergeWith(fromEvent(doc, 'visibilitychange').pipe(filter(() => !doc.hidden))),
        map(() => getInitialPageUrl(contentService.pageUrl))
      )
    : EMPTY;

  const initialPageUrl = getInitialPageUrl(contentService.pageUrl);
  const cachedPage = contentService.getCachedPageContent(
    initialPageUrl, shouldPreloadPageComponents(initialPageUrl)
  );
  const pageContent = signal<IPage | undefined | false>(cachedPage ?? false);
  if (cachedPage) {
    contentState.pageConfig.set(cachedPage.config);
  }
  let initialRead = true;
  router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(event => (event ? contentService.pageUrl : initialPageUrl)),
      distinctUntilChanged(),
      mergeWith(revisit$),
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
        if (!initialRead && shouldPreloadPageComponents(pageUrl)) {
          pageContent.set(false);
          contentState.drawerOpened.set(false);
        }
        initialRead = false;
        return forkJoin({
          config: from(contentService.loadConfig(coreConfig, pageUrl)),
          page: contentService.loadPageContent(pageUrl, true, shouldPreloadPageComponents(pageUrl)),
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

/** Combines allowed notification sources in configuration order on each poll. */
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
        map(res =>
          Object.keys(res).flatMap(item => {
            const api = apis[Number(item)];
            return res[item].rows.map((list: any) => ({
              link: {
                href: list.url,
                label: list.title,
              },
              icon: {
                svg: api.icon,
                inline: true,
                color: api.color,
              },
              message: list.message,
              date: list.date,
              action: api.action,
              uuid: list.uuid,
            }));
          })
        ),
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
      page: contentService.loadPageContent(pageUrl, false, true),
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

export function getBuilderConfig(): Observable<IBuilderConfig> {
  return inject(ContentService).loadBuilderConfig();
}

export function uiuxFactory(): Observable<any[]> {
  return inject(ContentService).loadUIUX();
}
