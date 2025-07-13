import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TokenUser, IUser, IUserProfile } from '../interface/IUser';
import { LocalStorageService } from 'ngx-webstorage';
import { CryptoJSService } from './crypto-js.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { environment } from 'src/environments/environment';
import { intersection } from 'lodash-es';
import { CookieService } from 'ngx-cookie-service';
import { UtilitiesService } from './utilities.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { IDialog } from '@core/interface/IDialog';
@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  public userSub$ = new Subject<IUser | boolean>();

  private router = inject(Router);
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private util = inject(UtilitiesService);
  private cryptoJS = inject(CryptoJSService);
  private cookieService = inject(CookieService);
  private storage = inject(LocalStorageService);
  private route = inject(ActivatedRoute);
  get userApiPath(): string {
    return `${this.apiUrl}${this.coreConfig.apiUrl.userGetPath}`;
  }

  login(userName: string, passWord: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.api+json',
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
        httpOptions
      )
      .pipe(
        map(user => {
          this.updateUser(user);
          return true;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  updateUser(data: TokenUser): any {
    const {
      current_user: { uid },
      csrf_token,
    } = data;
    this.getCurrentUserById(uid, csrf_token).subscribe(user => {
      this.loginUser(data, user);
    });
  }

  editingUser(user: IUser, data: any): any {
    const { id, csrf_token } = user;
    return this.http.patch(
      `${this.apiUrl}/api/v1/user/user/${id}`,
      {
        data: {
          type: 'user--user',
          id,
          attributes: {
            ...data,
          },
        },
      },
      this.optionsWithCookieAndToken(csrf_token)
    );
  }

  updateUserBySession(): void {
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      }),
      withCredentials: true,
    };
    const sesstion = this.http.get('/session/token', {
      responseType: 'text',
    });
    const profile = this.http.get('/api/v3/accountProfile', options);
    let tokenUser = {};
    forkJoin({
      csrf_token: sesstion,
      current_user: profile,
    })
      .pipe(
        switchMap((data: any) => {
          tokenUser = data;
          return this.getCurrentUserById(data.current_user.uid, data.csrf_token);
        }),
        catchError((error: any) => {
          console.log(error);
          return of(null);
        })
      )
      .subscribe(user => {
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
    this.setUserCookie(currentUser);
  }

  logoutUser(): void {
    this.userSub$.next(false);
    this.cookieService.delete(this.localUserKey, '/');
  }

  logout(): any {
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
    const { logout_token } = JSON.parse(
      this.cryptoJS.decrypt(this.cookieService.get(this.localUserKey))
    ) as IUser;
    if (!logout_token) {
      this.util.openSnackbar('检测到会话异常，安全起见请手动清除Cookie', 'ok');
      return;
    }
    const params = ['_format=json', `token=${logout_token}`].join('&');
    return this.http
      .post(`${this.apiUrl}${this.coreConfig.apiUrl.logoutPath}?${params}`, null, httpOptions)
      .pipe(
        catchError(error => {
          if (error.status === 403) {
            // false: logout
            return of(false);
          }
          console.log('退出异常！');
          return of(false);
        })
      )
      .subscribe(() => {
        this.logoutUser();
      });
  }

  getCode(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v3/otp/generate?format=json`, {
      mobile_number: phone,
    });
  }

  loginByPhone(phone: number, code: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/api/v3/otp/login?format=json`, {
        mobile_number: phone,
        code,
      })
      .pipe(
        map(user => {
          this.updateUser(user);
          return true;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  getUserConfig(): Observable<any> {
    if (environment.production) {
      return this.http.get(`${this.apiUrl}/api/v3/landingPage?content=/core/user`);
    } else {
      return this.http.get(`${this.apiUrl}/assets/app/core/user.json`);
    }
  }

  getUserById(id: string, csrfToken: string): Observable<any> {
    const params = [
      `filter[drupal_internal__uid]=${id}`,
      `include=user_picture,roles`,
      `jsonapi_include=1`,
    ].join('&');
    return this.http.get<any>(
      `${this.userApiPath}?${params}`,
      this.optionsWithCookieAndToken(csrfToken)
    );
  }

  getUser(params: string): Observable<any> {
    return this.http.get<any>(`${this.userApiPath}?${params}`);
  }

  getCurrentUserProfile(csrfToken: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/v3/accountProfile?noCache=1`,
      this.optionsWithCookieAndToken(csrfToken)
    );
  }

  getCurrentUserById(uid: string, token: string): Observable<IUserProfile> {
    const params = [
      `filter[drupal_internal__uid]=${uid}`,
      `include=user_picture,roles`,
      `jsonapi_include=1`,
      `noCache=1`,
    ].join('&');
    return this.http
      .get<any>(`${this.userApiPath}?${params}`, this.optionsWithCookieAndToken(token))
      .pipe(
        catchError((error: any) => {
          return this.http.get<any>(
            `${this.apiUrl}/api/v3/personalProfile?noCache=1`,
            this.optionsWithCookieAndToken(token)
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
              picture: detail?.user_picture?.uri?.url || this.coreConfig?.defaultAvatar || '',
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
        })
      );
  }

  setUserCookie(user: IUser): void {
    // console.log(user);
    // Druapl default cookie_lifetime 2000000，if change, need to keep same
    this.cookieService.set(this.localUserKey, this.cryptoJS.encrypt(JSON.stringify(user)), {
      expires: this.getCookieExpirationDate(this.coreConfig.cookieLifetime ?? 2000000),
      path: '/',
      sameSite: 'Lax',
    });
  }

  getCookieExpirationDate(seconds: number): Date {
    const now = new Date();
    const expirationTime = new Date(now.getTime() + seconds * 1000);

    return expirationTime;
  }

  getLoginState(): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      withCredentials: true,
    };
    return this.http
      .get<any>(`${this.apiUrl}/user/login_status?_format=json&noCache=1`, httpOptions)
      .pipe(
        map(state => {
          if (state) {
            return true;
          }
          return false;
        })
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

  uploadUserPicture(user: IUser, imageData: string | ArrayBuffer): Observable<any> {
    const { id, csrf_token } = user;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'file; filename="' + id + '-picture.jpg"',
        'X-CSRF-Token': csrf_token,
      }),
      withCredentials: true,
    };
    return this.http.post(
      `${this.apiUrl}/api/v1/user/user/${id}/user_picture`,
      imageData,
      httpOptions
    );
  }

  openLoginDialog(): MatDialogRef<DialogComponent> {
    const { queryParams } = this.route.snapshot;
    const { pathname } = window.location;
    const options = {
      returnUrl: pathname,
      ...queryParams,
    };
    this.router.navigate([], { queryParams: options });
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'login',
          fullWidth: true,
        },
      },
    };
    return this.dialog.open(DialogComponent, {
      panelClass: ['close-outside', 'close-icon-white', 'login-dialog'],
      data: config,
    });
  }
}
