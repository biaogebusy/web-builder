import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TokenUser, IUser, IUserProfile } from '../interface/IUser';
import { CryptoJSService } from './crypto-js.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { environment } from 'src/environments/environment';
import { intersection } from 'lodash-es';
import { CookieService } from 'ngx-cookie-service';
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
  private dialog = inject(MatDialog);
  private cryptoJS = inject(CryptoJSService);
  private cookieService = inject(CookieService);
  private route = inject(ActivatedRoute);
  get userApiPath(): string {
    return `${this.apiUrl}${this.coreConfig.apiUrl.userGetPath}`;
  }

  login(userName: string, passWord: string): Observable<boolean> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', environment.oauth.clientId)
      .set('username', userName)
      .set('password', passWord);

    if (environment.oauth.scope) {
      body.set('scope', environment.oauth.scope);
    }

    return this.http
      .post<any>(`${this.apiUrl}${environment.oauth.tokenUrl}`, body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(
        switchMap(tokenData => {
          return this.getCurrentUserProfile(tokenData).pipe(
            switchMap(profile =>
              this.getCurrentUserById(profile.uid, tokenData).pipe(
                map(userProfile => {
                  const tokenUser: TokenUser = {
                    access_token: tokenData.access_token,
                    refresh_token: tokenData.refresh_token,
                    token_type: tokenData.token_type,
                    expires_in: tokenData.expires_in,
                    current_user: {
                      uid: String(profile.uid),
                      name: profile.name || '',
                      roles: [...profile.roles, ...userProfile.roles],
                    },
                  };
                  this.loginUser(tokenUser, userProfile);
                  return true;
                })
              )
            )
          );
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  updateUser(data: TokenUser): any {
    const {
      current_user: { uid },
    } = data;
    this.getCurrentUserById(uid, data).subscribe(user => {
      this.loginUser(data, user);
    });
  }

  editingUser(user: IUser, data: any): any {
    const { id } = user;
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
      this.optionsWithBearerToken()
    );
  }

  getStoredUser(): IUser | null {
    try {
      const key = this.localUserKey;
      if (this.cookieService.check(key)) {
        return JSON.parse(this.cryptoJS.decrypt(this.cookieService.get(key)));
      }
    } catch (e) {
      console.log('Failed to read stored user', e);
    }
    return null;
  }

  refreshAccessToken(): Observable<any> {
    const storedUser = this.getStoredUser();
    if (!storedUser || !storedUser.refresh_token) {
      return of(null);
    }
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', storedUser.refresh_token)
      .set('client_id', environment.oauth.clientId);

    if (environment.oauth.scope) {
      body.set('scope', environment.oauth.scope);
    }

    return this.http.post<any>(`${this.apiUrl}${environment.oauth.tokenUrl}`, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
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
      const uid = user.current_user.uid;
      if (this.isMatchCurrentRole(roles, currentUserRoles) || uid === '1') {
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
    const currentUser: IUser = Object.assign(data, user);
    this.userSub$.next(currentUser);
    this.setUserCookie(currentUser);
  }

  logoutUser(): void {
    this.userSub$.next(false);
    this.cookieService.delete(this.localUserKey, '/');
  }

  logout(): any {
    this.logoutUser();
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

  getUserById(id: string): Observable<any> {
    const params = [
      `filter[drupal_internal__uid]=${id}`,
      `include=user_picture,roles`,
      `jsonapi_include=1`,
    ].join('&');
    return this.http.get<any>(`${this.userApiPath}?${params}`, this.optionsWithBearerToken());
  }

  getUser(params: string): Observable<any> {
    return this.http.get<any>(`${this.userApiPath}?${params}`);
  }

  getCurrentUserProfile(tokenData: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v3/accountProfile?noCache=1`, {
      headers: this.getAuthHeader(tokenData.access_token),
    });
  }

  getAuthHeader(accessToken: string): any {
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    });
  }

  getCurrentUserById(uid: string, tokenData: any): Observable<IUserProfile> {
    const params = [
      `filter[drupal_internal__uid]=${uid}`,
      `include=user_picture,roles`,
      `jsonapi_include=1`,
      `noCache=1`,
    ].join('&');
    return this.http
      .get<any>(`${this.userApiPath}?${params}`, {
        headers: this.getAuthHeader(tokenData.access_token),
      })
      .pipe(
        catchError((error: any) => {
          return this.http.get<any>(`${this.apiUrl}/api/v3/personalProfile?noCache=1`, {
            headers: this.getAuthHeader(tokenData.access_token),
          });
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
              roles: detail?.roles?.map((role: any) => role.drupal_internal__id) || [],
            };
          } else {
            return {
              id: res.uid,
              display_name: res.name,
              mail: res.mail || '',
              authenticated: true,
              picture: res.avatar || this.coreConfig?.defaultAvatar || '',
              login: new Date(),
              roles: res.roles || [],
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
    const storedUser = this.getStoredUser();
    if (!storedUser || !storedUser.access_token) {
      return of(false);
    } else {
      return of(true);
    }
  }

  get userPage(): any[] {
    return [`/me`];
  }

  get userLink(): string[] {
    return ['/me/login'];
  }

  uploadUserPicture(user: IUser, imageData: string | ArrayBuffer): Observable<any> {
    const { id } = user;
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'file; filename="' + id + '-picture.jpg"',
      }),
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
