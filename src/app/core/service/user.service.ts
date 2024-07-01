import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TokenUser, IUser } from '../interface/IUser';
import { LocalStorageService } from 'ngx-webstorage';
import { CryptoJSService } from './crypto-js.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { environment } from 'src/environments/environment';
import { API_URL } from '@core/token/token-providers';
import { intersection } from 'lodash-es';
import { CookieService } from 'ngx-cookie-service';
import { UtilitiesService } from './utilities.service';
@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  userSub$ = new Subject<IUser | boolean>();

  http = inject(HttpClient);
  storage = inject(LocalStorageService);
  cryptoJS = inject(CryptoJSService);
  cookieService = inject(CookieService);
  util = inject(UtilitiesService);
  constructor(
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(API_URL) public apiBaseUrl: string,
  ) {
    super(apiBaseUrl);
  }

  get userApiPath(): string {
    return `${this.apiUrl}${this.coreConfig.apiUrl.userGetPath}`;
  }

  login(userName: string, passWord: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-type': 'application/vnd.api+json',
      }),
      withCredentials: false,
    };

    return this.http
      .post<any>(
        `${this.apiUrl}${this.coreConfig.apiUrl.loginPath}?_format=json`,
        {
          name: userName,
          pass: passWord,
        },
        httpOptions,
      )
      .pipe(
        map((user) => {
          this.updateUser(user);
          return true;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  updateUser(data: TokenUser): any {
    this.getCurrentUserById(data.current_user.uid, data.csrf_token).subscribe(
      (user) => {
        this.loginUser(data, user);
      },
    );
  }

  updateUserBySession(): void {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      }),
      withCredentials: true,
    };
    const sesstion = this.http.get('/session/token', {
      responseType: 'text',
    });
    const profile = this.http.get('/api/v1/accountProfile', options);
    let tokenUser = {};
    forkJoin({
      csrf_token: sesstion,
      current_user: profile,
    })
      .pipe(
        switchMap((data: any) => {
          tokenUser = data;
          return this.getCurrentUserById(
            data.current_user.uid,
            data.csrf_token,
          );
        }),
        catchError((error: any) => {
          console.log(error);
          return of(null);
        }),
      )
      .subscribe((user) => {
        console.log('get session user done!');
        this.loginUser(tokenUser, user);
      });
  }

  refreshLocalUser(user: IUser): void {
    this.userSub$.next(user);
    this.setUserCookie(user);
  }

  checkShow(content: any, user: IUser): boolean {
    // 没有内容不显示
    if (!content) {
      return false;
    }
    const roles = this.getParams(content, 'reqRoles');
    if (!roles || !roles.length) {
      return true;
    } else {
      if (!user) {
        return false;
      }
      const currentUserRoles = user.current_user.roles;
      if (this.isMatchCurrentRole(roles, currentUserRoles)) {
        return true;
      } else {
        return false;
      }
    }
  }

  isMatchCurrentRole(roles: string[], currentUserRoles: string[]): boolean {
    return intersection(currentUserRoles, roles).length > 0;
  }

  loginUser(data: any, user: any): void {
    const { logout_token } = data;
    const currentUser: IUser = Object.assign(data, user);
    this.userSub$.next(currentUser);
    if (logout_token) {
      this.storage.store(this.logoutToken, logout_token);
    }
    this.setUserCookie(currentUser);
  }

  logoutUser(): void {
    this.userSub$.next(false);
    this.cookieService.delete(this.localUserKey, '/');
    this.cookieService.delete(this.logoutToken, '/');
  }

  logout(logoutToken: string): any {
    if (environment.drupalProxy) {
      this.logoutUser();
      window.location.href = '/user/logout';
      return;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
      }),
      withCredentials: true,
    };
    if (!logoutToken) {
      this.util.openSnackbar('检测到会话异常，安全起见请手动清除Cookie', 'ok');
      return;
    }
    const params = ['_format=json', `token=${logoutToken}`].join('&');
    return this.http
      .post(
        `${this.apiUrl}${this.coreConfig.apiUrl.logoutPath}?${params}`,
        null,
        httpOptions,
      )
      .pipe(
        catchError((error) => {
          if (error.status === 403) {
            // false: logout
            return of(false);
          }
          console.log('退出异常！');
          return of(false);
        }),
      )
      .subscribe(() => {
        this.logoutUser();
      });
  }

  getCode(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/otp/generate?format=json`, {
      mobile_number: phone,
    });
  }

  loginByPhone(phone: number, code: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/api/v1/otp/login?format=json`, {
        mobile_number: phone,
        code,
      })
      .pipe(
        map((user) => {
          this.updateUser(user);
          return true;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  getUserConfig(): Observable<any> {
    if (environment.production) {
      return this.http.get(`${this.apiUrl}/api/v1/config?content=/core/user`);
    } else {
      return this.http.get(`${this.apiUrl}/assets/app/core/user.json`);
    }
  }

  getUserById(id: string, crsfToken: string): Observable<any> {
    const params = [
      `filter[drupal_internal__uid]=${id}`,
      `include=user_picture,roles`,
      `jsonapi_include=1`,
    ].join('&');
    return this.http.get<any>(
      `${this.userApiPath}?${params}`,
      this.optionsWithCookieAndToken(crsfToken),
    );
  }

  getUser(params: string): Observable<any> {
    return this.http.get<any>(`${this.userApiPath}?${params}`);
  }

  getCurrentUserProfile(crsfToken: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/v1/accountProfile?noCache=1`,
      this.optionsWithCookieAndToken(crsfToken),
    );
  }

  getCurrentUserById(uid: string, token: string): Observable<any> {
    const params = [
      `filter[drupal_internal__uid]=${uid}`,
      `include=user_picture,roles`,
      `jsonapi_include=1`,
      `noCache=1`,
    ].join('&');
    return this.http
      .get<any>(
        `${this.userApiPath}?${params}`,
        this.optionsWithCookieAndToken(token),
      )
      .pipe(
        catchError((error: any) => {
          return this.http.get<any>(
            `${this.apiUrl}/api/v1/personalProfile?noCache=1`,
            this.optionsWithCookieAndToken(token),
          );
        }),
        map((res: any) => {
          // jsonapi
          if (res.data) {
            const detail = res.data[0];
            return {
              id: detail.id,
              display_name: detail?.display_name || '',
              mail: detail?.mail || '',
              authenticated: true,
              picture:
                detail?.user_picture?.uri?.url ||
                this.coreConfig?.defaultAvatar ||
                '',
              login: detail.login,
            };
          } else {
            return {
              id: res.uid,
              display_name: res.name,
              mail: res.mail || '',
              authenticated: true,
              picture: res.avatar || this.coreConfig?.defaultAvatar || '',
              login: new Date(),
            };
          }
        }),
      );
  }

  setUserCookie(user: IUser): void {
    // console.log(user);
    this.cookieService.set(
      this.localUserKey,
      this.cryptoJS.encrypt(JSON.stringify(user)),
      {
        expires: 5,
        path: '/',
        sameSite: 'Lax',
      },
    );
  }

  getLoginState(): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      withCredentials: true,
    };
    return this.http
      .get<any>(
        `${this.apiUrl}/user/login_status?_format=json&noCache=1`,
        httpOptions,
      )
      .pipe(
        map((state) => {
          if (state) {
            return true;
          }
          return false;
        }),
      );
  }

  get userPage(): any[] {
    if (environment?.drupalProxy) {
      return ['/my'];
    }
    return [`/me`];
  }

  get userLink(): string[] {
    return [environment.drupalProxy ? '/my' : '/me/login'];
  }
}
