import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentState } from '@core/state/ContentState';
import { LocalStorageService } from 'ngx-webstorage';
import { IBranding } from '../interface/branding/IBranding';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
import { INotify } from '@core/interface/widgets/IWidgets';
import { map, startWith, switchMap } from 'rxjs/operators';
import { NotifyService } from '@core/service/notify.service';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenService } from '@core/service/screen.service';
import { NodeService } from '@core/service/node.service';
import { IManageAssets } from '@core/interface/manage/IManage';
import { ILanguage } from '@core/interface/IEnvironment';
import { CookieService } from 'ngx-cookie-service';
import { ComponentService } from '@core/service/component.service';
import { DOCUMENT, inject } from '@angular/core';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';

export const THEMKEY = 'themeMode';
export const DEBUG_ANIMATE_KEY = 'debugAnimate';
const BUILDERPATH = '/builder';

export function pageContentFactory(): Observable<IPage | object | boolean> {
  const activateRoute = inject(ActivatedRoute);
  const contentService = inject(ContentService);
  const contentState = inject(ContentState);

  const $pageContent = new BehaviorSubject<IPage | object | boolean>(false);
  activateRoute.url.subscribe(async url => {
    const page = await contentService.loadPageContent().toPromise();
    if (page) {
      $pageContent.next(page);
      contentState.pageConfig$.next(page.config);
    }
  });
  return $pageContent;
}

export function builderFullScreenFactory(): Observable<boolean> {
  const router = inject(Router);
  const builder = inject(BuilderState);
  const isFull$ = new BehaviorSubject<boolean>(false);

  router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      if (event.url.includes(BUILDERPATH)) {
        isFull$.next(false);
      }
    }
  });
  builder.fullScreen$.subscribe(state => {
    isFull$.next(state);
  });
  return isFull$;
}

export function builderCurrentPageFactory(): Observable<IPage | object | boolean> {
  const router = inject(Router);
  const versionKey = 'version';
  const currentPage$ = new BehaviorSubject<IPage | object | boolean>(false);
  const storage = inject(LocalStorageService);
  const builderService = inject(BuilderService);
  const localVersion = storage.retrieve(versionKey);

  if (localVersion) {
    const currentPage = localVersion.find((page: IPage) => page.current === true);
    if (router.url.includes(BUILDERPATH)) {
      builderService.checkIsLatestPage(currentPage);
    }
    currentPage$.next(currentPage);
  }

  storage.observe(versionKey).subscribe((version: IPage[]) => {
    if (version?.length > 0) {
      const current = version.find((page: IPage) => page.current === true) || version[0];
      currentPage$.next(current);
    }
  });

  return currentPage$;
}

export function debugAnimateFactory(): Observable<boolean> {
  const builder = inject(BuilderState);
  const storage = inject(LocalStorageService);
  const debugAnimate$ = new BehaviorSubject<boolean>(false);
  const isDebugAnimate = storage.retrieve(DEBUG_ANIMATE_KEY);
  if (isDebugAnimate) {
    debugAnimate$.next(true);
  } else {
    debugAnimate$.next(false);
  }

  setTimeout(() => {
    builder.renderMarkers(isDebugAnimate);
  }, 2000);

  builder.debugeAnimate$.subscribe(state => {
    storage.store(DEBUG_ANIMATE_KEY, state);
    debugAnimate$.next(state);
  });

  return debugAnimate$;
}

export function notifyFactory(coreConfig: ICoreConfig): Observable<INotify[] | object | boolean> {
  const notifyService = inject(NotifyService);
  const $notify = new BehaviorSubject<INotify[] | object | boolean>(false);
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
        })
      )
      .subscribe((res: INotify[]) => {
        $notify.next(res);
      });
  } else {
    $notify.next(false);
  }

  return $notify;
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

export function brandingFactory(): Observable<IBranding | object> {
  const contentService = inject(ContentService);
  return contentService.loadBranding();
}

export function userFactory(): Observable<IUser | boolean> {
  const cryptoJS = inject(CryptoJSService);
  const userService = inject(UserService);
  const cookieService = inject(CookieService);
  const screenService = inject(ScreenService);
  const key = userService.localUserKey;
  const doc = inject(DOCUMENT);
  const user$ = new BehaviorSubject<IUser | boolean>(false);
  if (screenService.isPlatformBrowser()) {
    if (cookieService.check(key)) {
      const user: IUser = JSON.parse(cryptoJS.decrypt(cookieService.get(key)));
      if (user) {
        user$.next(user);
      } else {
        user$.next(false);
      }
    }

    // if user info change will reload window
    if (environment?.drupalProxy) {
      if (!cookieService.check(key)) {
        doc.location.reload();
      }
    }
  }
  userService.userSub$.subscribe(user => {
    user$.next(user);
  });
  return user$;
}

export function mediaAssetsFactory(): Observable<IManageAssets | boolean> {
  const api = '/api/v2/media';
  const nodeService = inject(NodeService);
  const contentState = inject(ContentState);
  const userService = inject(UserService);
  const cookieService = inject(CookieService);
  const key = userService.localUserKey;
  const util = inject(UtilitiesService);
  const assets$ = new BehaviorSubject<IManageAssets | boolean>(false);
  let noCache = false;
  if (cookieService.check(key)) {
    noCache = true;
  }
  // on form search change
  contentState.mediaAssetsFormChange$.subscribe((value: any) => {
    const params = nodeService.getApiParams({ ...value, noCache });
    nodeService.fetch(api, params).subscribe(res => {
      assets$.next({
        rows: res.rows.map((item: any) => {
          const type = util.getFileType(item.source);
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

  return assets$;
}

export function getBuilderConfig(): Observable<IBuilderConfig> {
  return inject(ContentService).loadBuilderConfig();
}

export function uiuxFactory(): Observable<any[]> {
  return inject(ContentService).loadUIUX();
}
