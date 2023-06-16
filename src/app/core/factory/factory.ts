import { ActivatedRoute } from '@angular/router';
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
import { map, startWith } from 'rxjs/operators';
import { NotifyService } from '@core/service/notify.service';

export const THEMKEY = 'themeMode';
export const DEBUGANIMATEKEY = 'debugAnimate';

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

export function notifyFactory(
  coreConfig: ICoreConfig,
  notifyService: NotifyService
): Observable<INotify[] | object | boolean> {
  const $notify = new BehaviorSubject<INotify[] | object | boolean>(false);
  const apis: any = coreConfig?.notify?.api;
  if (apis) {
    const source = interval(
      coreConfig?.notify?.params.interval || 2 * 60 * 1000
    );
    source.pipe(startWith(0)).subscribe((time) => {
      notifyService
        .getWatchList()
        .pipe(
          map((res) => {
            let lists: INotify[] = [];
            for (const item in res) {
              const message = res[item].rows.map((list: any) => {
                return {
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
                };
              });
              lists = [...message];
            }
            return lists;
          })
        )
        .subscribe((res: INotify[]) => {
          $notify.next(res);
        });
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

export function debugAnimateFactory(storage: LocalStorageService): boolean {
  const isDebugAnimate = storage.retrieve(DEBUGANIMATEKEY);
  if (isDebugAnimate) {
    return true;
  } else {
    return false;
  }
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
