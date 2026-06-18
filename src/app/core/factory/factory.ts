import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentState } from '@core/state/ContentState';
import { LocalStorageService } from 'ngx-webstorage';
import { IBranding } from '../interface/branding/IBranding';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
import { INotify } from '@core/interface/widgets/IWidgets';
import { map, startWith, switchMap, take } from 'rxjs/operators';
import { NotifyService } from '@core/service/notify.service';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenService } from '@core/service/screen.service';
import { NodeService } from '@core/service/node.service';
import { IManageAssets } from '@core/interface/manage/IManage';
import { ILanguage } from '@core/interface/IEnvironment';
import { CookieService } from 'ngx-cookie-service';
import { ComponentService } from '@core/service/component.service';
import { DestroyRef, DOCUMENT, inject, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { getFileType } from '@core/util/file-type.util';

export const THEMKEY = 'themeMode';
export const DEBUG_ANIMATE_KEY = 'debugAnimate';
const BUILDERPATH = '/builder';

export function pageContentFactory(): WritableSignal<IPage | undefined | false> {
  const activateRoute = inject(ActivatedRoute);
  const contentService = inject(ContentService);
  const contentState = inject(ContentState);
  const destroyRef = inject(DestroyRef);

  const pageContent = signal<IPage | undefined | false>(false);
  activateRoute.url.pipe(takeUntilDestroyed(destroyRef)).subscribe(async () => {
    const page = await contentService.loadPageContent().toPromise();
    if (page) {
      pageContent.set(page);
      contentState.pageConfig.set(page.config);
    }
  });
  return pageContent;
}

export function builderFullScreenFactory(): WritableSignal<boolean> {
  const router = inject(Router);
  const builder = inject(BuilderState);
  const destroyRef = inject(DestroyRef);
  const isFull = signal(false);

  router.events.pipe(takeUntilDestroyed(destroyRef)).subscribe(event => {
    if (event instanceof NavigationEnd) {
      if (event.url.includes(BUILDERPATH)) {
        isFull.set(false);
      }
    }
  });
  builder.fullScreen$.pipe(takeUntilDestroyed(destroyRef)).subscribe(state => {
    isFull.set(state);
  });
  return isFull;
}

export function builderCurrentPageFactory(): WritableSignal<IPage | undefined | false> {
  const router = inject(Router);
  const versionKey = 'version';
  const currentPage = signal<IPage | undefined | false>(false);
  const storage = inject(LocalStorageService);
  const builderService = inject(BuilderService);
  const destroyRef = inject(DestroyRef);
  const localVersion = storage.retrieve(versionKey);

  if (localVersion) {
    const found = localVersion.find((page: IPage) => page.current === true);
    if (router.url.includes(BUILDERPATH)) {
      builderService.checkIsLatestPage(found);
    }
    currentPage.set(found);
  }

  storage
    .observe(versionKey)
    .pipe(takeUntilDestroyed(destroyRef))
    .subscribe((version: IPage[]) => {
      if (version?.length > 0) {
        const current = version.find((page: IPage) => page.current === true) || version[0];
        currentPage.set(current);
      }
    });

  return currentPage;
}

export function debugAnimateFactory(): WritableSignal<boolean> {
  const builder = inject(BuilderState);
  const storage = inject(LocalStorageService);
  const destroyRef = inject(DestroyRef);
  const isDebugAnimate = storage.retrieve(DEBUG_ANIMATE_KEY);
  const debugAnimate = signal<boolean>(!!isDebugAnimate);

  setTimeout(() => {
    builder.renderMarkers(isDebugAnimate);
  }, 2000);

  builder.debugeAnimate$.pipe(takeUntilDestroyed(destroyRef)).subscribe(state => {
    storage.store(DEBUG_ANIMATE_KEY, state);
    debugAnimate.set(state);
  });

  return debugAnimate;
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
  componentService.registerDynamicComponent();
  return () => contentService.loadConfig(coreConfig);
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
  const defaultTheme = coreConfig.defaultTheme || 'blue-theme';
  const localTheme = storage.retrieve(THEMKEY);
  if (localTheme && coreConfig.theme) {
    // checkout the theme is removed
    const isInThemeList = coreConfig.theme.filter(item => item.style === localTheme);
    if (isInThemeList.length) {
      return localTheme;
    } else {
      return defaultTheme;
    }
  }
  return defaultTheme;
}

export function brandingFactory(): Observable<IBranding> {
  return inject(ContentService).loadBranding();
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
  // on form search change
  contentState.mediaAssetsFormChange$
    .pipe(takeUntilDestroyed(destroyRef))
    .subscribe((value: any) => {
      const params = nodeService.getApiParams({ ...value, noCache });
      nodeService
        .fetch(api, params)
        .pipe(take(1))
        .subscribe(res => {
          assets.set({
            rows: res.rows.map((item: any) => {
              const type = getFileType(item.source);
              return {
                ...item,
                src: type === 'svg' ? item.source : item.thumb,
                title: decodeURIComponent(item.title),
              };
            }),
            pager: nodeService.handlerPager(res.pager, res.rows.length),
          });
        });
    });

  return assets;
}

export function getBuilderConfig(): Observable<IBuilderConfig> {
  return inject(ContentService).loadBuilderConfig();
}

export function uiuxFactory(): Observable<any[]> {
  return inject(ContentService).loadUIUX();
}
