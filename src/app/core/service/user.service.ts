import { HttpHeaders, HttpParams } from '@angular/common/http';
import { DOCUMENT, Injectable, PLATFORM_ID, REQUEST, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, Subject, firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { TokenUser, IUser, IUserProfile } from '../interface/IUser';
import { CryptoJSService } from './crypto-js.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import type { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

const loadDialogComponent = (): Promise<typeof DialogComponent> =>
  import('@uiux/widgets/dialog/dialog.component').then(m => m.DialogComponent);
import { IDialog } from '@core/interface/IDialog';
import { generateCodeChallenge, generateCodeVerifier, generateState } from '@core/util/pkce.util';
import {
  getCookieExpirationDate,
  getTokenExpirationTime,
  isMatchCurrentRole,
  isTokenExpired,
  parseServerCookie,
} from '@core/util/auth-token.util';

interface AuthBroadcastMessage { type: 'login' | 'logout' }

export type OAuthMode = 'redirect' | 'popup';

export interface StartAuthorizeOptions {
  mode?: OAuthMode;
  returnUrl?: string;
  idp?: string;
}

export interface CallbackResult {
  mode: OAuthMode;
  returnUrl: string;
}

interface PkceStash {
  verifier: string;
  state: string;
  mode: OAuthMode;
  returnUrl: string;
}

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
  private doc = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private serverRequest = inject(REQUEST, { optional: true });

  private readonly userGetPath = '/api/v1/user/user';
  private readonly authChannelName = 'xinshi-auth';
  private readonly pkceStorageKey = 'xinshi-oauth-pkce';
  private authChannel: BroadcastChannel | null = null;

  constructor() {
    super();
    this.setupAuthChannel();
  }

  private setupAuthChannel(): void {
    if (!this.isBrowser || typeof BroadcastChannel === 'undefined') {
      return;
    }
    this.authChannel = new BroadcastChannel(this.authChannelName);
    this.authChannel.addEventListener('message', event => {
      const data = event.data as AuthBroadcastMessage | undefined;
      if (!data?.type) {
        return;
      }
      if (data.type === 'login') {
        const stored = this.getStoredUser();
        if (stored) {
          this.userSub$.next(stored);
        }
      } else if (data.type === 'logout') {
        this.userSub$.next(false);
      }
    });
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private broadcastAuth(message: AuthBroadcastMessage): void {
    this.authChannel?.postMessage(message);
  }

  get userApiPath(): string {
    return `${this.apiUrl}${this.userGetPath}`;
  }

  login(): void {
    this.startAuthorize({ mode: 'redirect' });
  }

  async startAuthorize(options: StartAuthorizeOptions = {}): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    const mode: OAuthMode = options.mode ?? 'redirect';
    const verifier = generateCodeVerifier();
    const state = generateState();
    const challenge = await generateCodeChallenge(verifier);
    const returnUrl =
      options.returnUrl ?? `${this.doc.location.pathname}${this.doc.location.search}`;

    const stash: PkceStash = { verifier, state, mode, returnUrl };
    window.sessionStorage.setItem(this.pkceStorageKey, JSON.stringify(stash));

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: environment.oauth.clientId,
      redirect_uri: this.getRedirectUri(),
      state,
      code_challenge: challenge,
      code_challenge_method: 'S256',
    });
    if (environment.oauth.scope) {
      params.set('scope', environment.oauth.scope);
    }
    if (options.idp) {
      params.set('idp', options.idp);
    }
    const authorizeUrl = `${this.apiUrl}${environment.oauth.authorizeUrl}?${params.toString()}`;

    if (mode === 'popup') {
      this.openLoginPopup(authorizeUrl);
      return;
    }
    window.location.assign(authorizeUrl);
  }

  async handleOAuthCallback(): Promise<CallbackResult> {
    if (!this.isBrowser) {
      throw new Error('OAuth callback requires browser context');
    }
    const search = new URLSearchParams(window.location.search);
    const error = search.get('error');
    if (error) {
      throw new Error(search.get('error_description') || error);
    }
    const code = search.get('code');
    const state = search.get('state');
    if (!code || !state) {
      throw new Error('Missing code or state in callback URL');
    }
    const stash = this.readPkceStash();
    if (!stash) {
      throw new Error('Missing PKCE session, please retry login');
    }
    if (stash.state !== state) {
      throw new Error('OAuth state mismatch');
    }
    window.sessionStorage.removeItem(this.pkceStorageKey);

    const tokenData = await firstValueFrom(this.exchangeCodeForToken(code, stash.verifier));
    await firstValueFrom(this.processTokenAndLogin(tokenData));
    return { mode: stash.mode, returnUrl: stash.returnUrl };
  }

  private exchangeCodeForToken(code: string, verifier: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', environment.oauth.clientId)
      .set('code', code)
      .set('code_verifier', verifier)
      .set('redirect_uri', this.getRedirectUri());

    return this.http.post<any>(`${this.apiUrl}${environment.oauth.tokenUrl}`, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  private getRedirectUri(): string {
    return `${environment.apiUrl}${environment.oauth.redirectPath}`;
  }

  private readPkceStash(): PkceStash | null {
    try {
      const raw = window.sessionStorage.getItem(this.pkceStorageKey);
      return raw ? (JSON.parse(raw) as PkceStash) : null;
    } catch {
      return null;
    }
  }

  private openLoginPopup(authorizeUrl: string): void {
    const width = 480;
    const height = 640;
    const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
    const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);
    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    const popup = window.open(authorizeUrl, 'xinshi-login', features);
    popup?.focus();
  }

  processTokenAndLogin(tokenData: any): Observable<boolean> {
    return this.getCurrentUserProfile(tokenData).pipe(
      switchMap(profile =>
        this.getCurrentUserById(profile.uid, tokenData).pipe(
          map(userProfile => {
            const tokenUser: TokenUser = {
              access_token: tokenData.access_token,
              refresh_token: tokenData.refresh_token,
              token_type: tokenData.token_type,
              expires_in: tokenData.expires_in,
              expires_at: getTokenExpirationTime(tokenData),
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
  }

  updateUser(data: TokenUser): any {
    const {
      current_user: { uid },
    } = data;
    this.getCurrentUserById(uid, data)
      .pipe(take(1))
      .subscribe(user => {
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
      const raw = this.readCookieValue(key);
      if (!raw) {
        return null;
      }
      return JSON.parse(this.cryptoJS.decrypt(raw));
    } catch (e) {
      console.error('Failed to read stored user', e);
    }
    return null;
  }

  private readCookieValue(name: string): string | null {
    if (this.isBrowser) {
      return this.cookieService.check(name) ? this.cookieService.get(name) : null;
    }
    const header = this.serverRequest?.headers.get('cookie');
    if (!header) {
      return null;
    }
    return parseServerCookie(header, name);
  }

  applyRefreshedToken(tokenData: any): IUser | null {
    const stored = this.getStoredUser();
    if (!stored) {
      return null;
    }
    stored.access_token = tokenData.access_token;
    stored.refresh_token = tokenData.refresh_token ?? stored.refresh_token;
    stored.expires_in = tokenData.expires_in;
    stored.expires_at = getTokenExpirationTime(tokenData);
    this.refreshLocalUser(stored);
    return stored;
  }

  refreshAccessToken(): Observable<any> {
    const storedUser = this.getStoredUser();
    if (!storedUser || !storedUser.refresh_token) {
      return of(null);
    }
    let body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', storedUser.refresh_token)
      .set('client_id', environment.oauth.clientId);

    if (environment.oauth.scope) {
      body = body.set('scope', environment.oauth.scope);
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
      if (isMatchCurrentRole(roles, currentUserRoles) || uid === '1') {
        return true;
      } else {
        return false;
      }
    }
  }

  loginUser(data: any, user: any): void {
    const currentUser: IUser = Object.assign(data, user);
    this.userSub$.next(currentUser);
    this.setUserCookie(currentUser);
    this.broadcastAuth({ type: 'login' });
  }

  logoutUser(): void {
    this.userSub$.next(false);
    this.cookieService.delete(this.localUserKey, '/');
    this.broadcastAuth({ type: 'logout' });
  }

  logout(): any {
    this.logoutUser();
    if (!this.isBrowser) {
      return;
    }
    this.clearDrupalSessionThenGoHome();
  }

  private clearDrupalSessionThenGoHome(): void {
    const iframe = this.doc.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('aria-hidden', 'true');
    let done = false;
    const finish = (): void => {
      if (done) {
        return;
      }
      done = true;
      iframe.remove();
      this.router.navigateByUrl('/home');
    };
    iframe.addEventListener('load', finish);
    iframe.src = `${this.apiUrl}${environment.oauth.logoutPath}`;
    this.doc.body.appendChild(iframe);
    setTimeout(finish, 3000);
  }

  getCode(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v3/otp/generate?format=json`, {
      mobile_number: phone,
    });
  }

  loginByPhone(phone: number, code: string): Observable<{ ok: boolean; message?: string }> {
    const authParams = environment.oauth.clientId
      ? { grant_type: 'oauth2', client_id: environment.oauth.clientId }
      : {};

    return this.http
      .post<any>(`${this.apiUrl}/api/v3/otp/login`, {
        mobile_number: phone,
        code,
        ...authParams,
      })
      .pipe(
        switchMap(response => {
          // Backend returns HTTP 200 with { status: false, message } on failure.
          if (response?.status === false) {
            return of({ ok: false, message: response.message || '登录失败' });
          }
          if (environment.oauth.clientId) {
            if (!response?.access_token) {
              return of({ ok: false, message: '后端未返回有效的令牌' });
            }
            return this.processTokenAndLogin(response).pipe(map(ok => ({ ok })));
          }
          this.updateUser(response);
          return of({ ok: true });
        }),
        catchError(error => {
          console.error('Phone login failed:', error);
          const message = error?.error?.message || error?.message || '登录请求失败';
          return of({ ok: false, message });
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
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.api+json',
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
              roles: (Array.isArray(detail?.roles) ? detail.roles : []).map(
                (role: any) => role.meta.drupal_internal__target_id
              ),
            };
          } else {
            return {
              id: res.uid,
              display_name: res.name,
              mail: res.mail || '',
              authenticated: true,
              picture: res.avatar || this.coreConfig?.defaultAvatar || '',
              login: new Date().toISOString(),
              roles: res.roles || [],
            };
          }
        })
      );
  }

  setUserCookie(user: IUser): void {
    // Druapl default cookie_lifetime 2000000，if change, need to keep same
    this.cookieService.set(this.localUserKey, this.cryptoJS.encrypt(JSON.stringify(user)), {
      expires: getCookieExpirationDate(this.coreConfig.cookieLifetime ?? 2000000),
      path: '/',
      sameSite: 'Lax',
    });
  }

  getLoginState(): Observable<boolean> {
    const storedUser = this.getStoredUser();
    if (!storedUser || !storedUser.access_token || isTokenExpired(storedUser)) {
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
        'Accept': 'application/vnd.api+json',
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

  async openLoginDialog(): Promise<MatDialogRef<DialogComponent>> {
    const { queryParams } = this.route.snapshot;
    const { pathname } = this.doc.location;
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
    const DialogComponent = await loadDialogComponent();
    return this.dialog.open(DialogComponent, {
      panelClass: ['close-outside', 'close-icon-white', 'login-dialog'],
      data: config,
    });
  }
}
