import { ActivatedRoute } from '@angular/router';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentState } from '@core/mobx/ContentState';
import { LocalStorageService } from 'ngx-webstorage';
import { IBranding } from '../interface/IBranding';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';

export const MODE = 'themeMode';

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
  const localTheme = storage.retrieve(MODE);
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
    console.log(user);
    return user;
  }
  return false;
}
