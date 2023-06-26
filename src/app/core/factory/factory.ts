import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { Observable, BehaviorSubject, interval, of, Subject } from 'rxjs';
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
import { IManageSidebarState } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';

export const THEMKEY = 'themeMode';
export const DEBUG_ANIMATE_KEY = 'debugAnimate';

export function pageContentFactory(
  activateRoute: ActivatedRoute,
  contentService: ContentService,
  contentState: ContentState
): Observable<IPage | object | boolean> {
  const $pageContent = new BehaviorSubject<IPage | object | boolean>(false);
  activateRoute.url.subscribe(async (url) => {
    const page = await contentService.loadPageContent().toPromise();
    $pageContent.next(page);
    contentState.pageConfig$.next(page.config);
  });
  return $pageContent;
}

export function builderFullScreenFactory(
  router: Router,
  storage: LocalStorageService,
  builder: BuilderState
): Observable<boolean> {
  const isFull$ = new BehaviorSubject<boolean>(false);
  router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      const isFull = storage.retrieve('builderFullScreen');
      if (event.url.includes('/builder') && isFull !== false) {
        isFull$.next(true);
      } else {
        isFull$.next(false);
      }
    }
  });
  builder.fullScreen$.subscribe((state) => {
    isFull$.next(state);
  });
  return isFull$;
}

export function disableBrandFactory(roter: Router): Observable<boolean> {
  const disableBrand$ = new BehaviorSubject<boolean>(false);
  roter.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      if (event.url.includes('/builder')) {
        disableBrand$.next(true);
      } else {
        disableBrand$.next(false);
      }
    }
  });
  return disableBrand$;
}

export function debugAnimateFactory(
  storage: LocalStorageService,
  builder: BuilderState
): Observable<boolean> {
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

  builder.debugeAnimate$.subscribe((state) => {
    storage.store(DEBUG_ANIMATE_KEY, state);
    debugAnimate$.next(state);
  });

  return debugAnimate$;
}

export function enableToolbarFactory(router: Router): Observable<boolean> {
  const enableToolbar$ = new BehaviorSubject<boolean>(false);
  const BUILDERPATH = '/builder';
  if (router.url.includes(BUILDERPATH)) {
    enableToolbar$.next(true);
  } else {
    enableToolbar$.next(false);
  }
  router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      if (event.url.includes(BUILDERPATH)) {
        enableToolbar$.next(true);
      } else {
        enableToolbar$.next(false);
      }
    }
  });
  return enableToolbar$;
}

export function gsapScrollerFactory(doc: Document): any {
  const scroller = doc.getElementById('gsap-scroller');
  if (scroller) {
    return '#gsap-scroller';
  } else {
    return window;
  }
}

export function manageSidebarStateFactory(
  router: Router,
  branding$: Observable<IBranding>,
  userService: UserService,
  screenService: ScreenService,
  storage: LocalStorageService,
  user: IUser,
  doc: Document
): Observable<IManageSidebarState> {
  const state$ = new BehaviorSubject<IManageSidebarState>({
    enableSidebar: false,
    sidebarOpened: false,
  });
  let enableSidebar = false;
  const openState = storage.retrieve('sidebarOpened');
  branding$.subscribe((branding) => {
    if (userService.checkShow(branding.header?.sidebar, user)) {
      // init manage sidebar
      if (doc.location.pathname.split('/').length === 2) {
        enableSidebar = false;
        state$.next({
          enableSidebar: enableSidebar,
          sidebarOpened: false,
        });
      } else {
        if (openState === null) {
          state$.next({
            enableSidebar: true,
            sidebarOpened: true,
          });
          storage.store('sidebarOpened', true);
        } else {
          state$.next({
            enableSidebar: true,
            sidebarOpened: storage.retrieve('sidebarOpened'),
          });
        }
      }

      // subject manage sidebar
      router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const url = event.url;
          if (url.split('/').length === 2) {
            if (enableSidebar) {
              state$.next({
                enableSidebar: false,
                sidebarOpened: false,
              });
              screenService.initSidebarStyle(true);
            }
          } else {
            if (openState === null) {
              state$.next({
                enableSidebar: true,
                sidebarOpened: true,
              });
              storage.store('sidebarOpened', true);
            } else {
              state$.next({
                enableSidebar: true,
                sidebarOpened: storage.retrieve('sidebarOpened'),
              });
            }
          }
        }
      });
    } else {
      state$.next({
        enableSidebar: false,
        sidebarOpened: false,
      });
    }
  });

  return state$;
}

export function notifyFactory(
  coreConfig: ICoreConfig,
  notifyService: NotifyService
): Observable<INotify[] | object | boolean> {
  const $notify = new BehaviorSubject<INotify[] | object | boolean>(false);
  const apis = coreConfig?.notify?.api;

  if (apis) {
    const intervalTime = coreConfig?.notify?.params.interval || 2 * 60 * 1000;
    const source = interval(intervalTime);

    source
      .pipe(
        startWith(0),
        switchMap(() => notifyService.getWatchList()),
        map((res) => {
          let lists: INotify[] = [];
          Object.keys(res).map((item: any) => {
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
  // can use front url to query backend api, ngxin will proxy
  return environment.apiUrl;
};

export function coreConfigFactory(
  contentService: ContentService,
  coreConfig: object
): any {
  return () => contentService.loadConfig(coreConfig);
}

export function themeFactory(
  coreConfig: ICoreConfig,
  storage: LocalStorageService
): string {
  const localTheme = storage.retrieve(THEMKEY);
  if (localTheme) {
    return localTheme;
  }
  return coreConfig.defaultTheme || 'light-theme';
}

export function brandingFactory(
  contentService: ContentService
): Observable<IBranding | object> {
  return contentService.loadBranding();
}

export function userFactory(
  storage: LocalStorageService,
  cryptoJS: CryptoJSService,
  userService: UserService
): IUser | boolean {
  const key = userService.localUserKey;
  if (storage.retrieve(key)) {
    const user = JSON.parse(cryptoJS.decrypt(storage.retrieve(key)));
    return user;
  }

  // if user info change will reload window
  if (environment?.drupalProxy) {
    storage.observe(userService.localUserKey).subscribe((user) => {
      window.location.reload();
    });
  }
  return false;
}
