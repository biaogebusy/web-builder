import { HttpHeaders, HttpParams } from '@angular/common/http';
import { DOCUMENT, Injectable, PLATFORM_ID, REQUEST, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, Subject, Subscription, firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { map, catchError, switchMap, take, timeout } from 'rxjs/operators';
import {
  AccountProfileResponse,
  DrupalUserListResponse,
  OAuthTokenResponse,
  PersonalProfileResponse,
  TokenUser,
  IUser,
  IUserProfile,
  UserProfileResponse,
} from '../interface/IUser';
import type { IUserConfig } from '@core/interface/IUserConfig';
import { CryptoJSService } from './crypto-js.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { JsonObject } from '@core/interface/common';
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
import { appendQueryParams, buildQueryString, QueryParams } from '@core/util/http-params.util';

interface AuthBroadcastMessage {
  type: 'login' | 'logout';
}

export type OAuthMode = 'redirect' | 'popup';

/**
 * Sentinel reasons rejected by {@link UserService.startAuthorize} in popup mode, so callers can
 * map them to localized copy instead of surfacing an internal message.
 */
export const OAUTH_POPUP_BLOCKED = 'oauth_popup_blocked';
export const OAUTH_POPUP_CLOSED = 'oauth_popup_closed';
export const OAUTH_POPUP_TIMEOUT = 'oauth_popup_timeout';

/**
 * Sentinel reasons rejected by {@link UserService.handleOAuthCallback}. Same contract as the popup
 * ones: the callback screen maps them to localized copy, so no internal English text reaches the
 * UI. The sentinel is also the diagnostic — it survives into the console log.
 */
export const OAUTH_CALLBACK_DENIED = 'oauth_callback_denied';
export const OAUTH_CALLBACK_PROVIDER_ERROR = 'oauth_callback_provider_error';
export const OAUTH_CALLBACK_MISSING_PARAMS = 'oauth_callback_missing_params';
export const OAUTH_CALLBACK_NO_SESSION = 'oauth_callback_no_session';
export const OAUTH_CALLBACK_STATE_MISMATCH = 'oauth_callback_state_mismatch';

/** Upper bound on the wait, so a popup left open never pins the opener in a pending state. */
const POPUP_MAX_WAIT_MS = 5 * 60 * 1000;
const POPUP_POLL_MS = 500;

/** Caps how long a logout waits on the backend before finishing locally anyway. */
const LOGOUT_TIMEOUT_MS = 5 * 1000;

export interface StartAuthorizeOptions {
  mode?: OAuthMode;
  returnUrl?: string;
  idp?: string;
  /** Stops watching the popup once the caller is gone, e.g. when its component is destroyed. */
  signal?: AbortSignal;
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

interface OtpGenerateResponse {
  status?: boolean;
  code?: string;
  message?: string;
}

/**
 * Outcome of an OTP call. `code` is the backend's stable machine-readable reason (see the
 * `OtpErrorCode` constants in the xinshi_sms module) and is what callers should map to copy;
 * `message` is English-only debug text and `status` is the HTTP status when the request failed.
 */
export interface OtpResult {
  ok: boolean;
  code?: string;
  message?: string;
  status?: number;
}

interface PhoneLoginResponse extends Partial<OAuthTokenResponse>, Partial<TokenUser> {
  status?: boolean;
  code?: string;
  message?: string;
}

interface RoleRestrictedContent {
  params?: {
    reqRoles?: string[];
  };
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
    this.openAuthChannel();
    // An open BroadcastChannel with listeners prevents the page from entering the
    // back/forward cache (bfcache), so the channel is closed on pagehide and reopened on
    // bfcache restore; while the page is frozen it misses login/logout broadcasts from
    // other tabs, so on restore it re-syncs once from the cookie login state.
    const win = this.doc.defaultView;
    win?.addEventListener('pagehide', () => this.closeAuthChannel());
    win?.addEventListener('pageshow', event => {
      if (!event.persisted) {
        return;
      }
      this.openAuthChannel();
      this.userSub$.next(this.getStoredUser() ?? false);
    });
  }

  private openAuthChannel(): void {
    if (this.authChannel) {
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

  private closeAuthChannel(): void {
    this.authChannel?.close();
    this.authChannel = null;
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
    const authorizePath = await this.prepareAuthorizeRequest(options, mode);
    return this.handOff(`${this.apiUrl}${authorizePath}`, mode, options.signal);
  }

  /**
   * Starts a social provider that only opens a Drupal session, pointing it back at the authorize
   * request through `destination`. Without that hop the provider drops the user on a CMS page,
   * signed into Drupal while the app still holds no token.
   */
  async startSocialAuthorize(
    providerPath: string,
    options: StartAuthorizeOptions = {}
  ): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    const mode: OAuthMode = options.mode ?? 'redirect';
    const authorizePath = await this.prepareAuthorizeRequest(options, mode);
    const providerUrl = appendQueryParams(`${this.apiUrl}${providerPath}`, {
      destination: authorizePath,
    });
    return this.handOff(providerUrl, mode, options.signal);
  }

  /** Stashes a fresh PKCE challenge and returns the site-relative authorize path. */
  private async prepareAuthorizeRequest(
    options: StartAuthorizeOptions,
    mode: OAuthMode
  ): Promise<string> {
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
    return `${environment.oauth.authorizeUrl}?${params.toString()}`;
  }

  private handOff(url: string, mode: OAuthMode, signal?: AbortSignal): Promise<void> {
    if (mode === 'popup') {
      return this.runLoginPopup(url, signal);
    }
    window.location.assign(url);
    return Promise.resolve();
  }

  async handleOAuthCallback(): Promise<CallbackResult> {
    if (!this.isBrowser) {
      throw new Error('OAuth callback requires browser context');
    }
    const search = new URLSearchParams(window.location.search);
    const error = search.get('error');
    if (error) {
      // The provider's own wording is English and unbounded, so it stays in the console; the thrown
      // sentinel is what the screen renders.
      console.error('OAuth provider rejected the request:', error, search.get('error_description'));
      throw new Error(
        error === 'access_denied' ? OAUTH_CALLBACK_DENIED : OAUTH_CALLBACK_PROVIDER_ERROR
      );
    }
    const code = search.get('code');
    const state = search.get('state');
    if (!code || !state) {
      throw new Error(OAUTH_CALLBACK_MISSING_PARAMS);
    }
    const stash = this.readPkceStash();
    if (!stash) {
      throw new Error(OAUTH_CALLBACK_NO_SESSION);
    }
    if (stash.state !== state) {
      throw new Error(OAUTH_CALLBACK_STATE_MISMATCH);
    }

    const tokenData = await firstValueFrom(this.exchangeCodeForToken(code, stash.verifier));
    await firstValueFrom(this.processTokenAndLogin(tokenData));
    // Dropped only once the login is complete. A failed exchange has to leave the stash behind,
    // otherwise the callback screen cannot retry and every recovery ends in "Missing PKCE
    // session".
    window.sessionStorage.removeItem(this.pkceStorageKey);
    return { mode: stash.mode, returnUrl: stash.returnUrl };
  }

  /**
   * The returnUrl of the authorize request still in flight, so a failed callback can retry the
   * page the user actually came from instead of dropping them on the login redirect default.
   */
  get pendingReturnUrl(): string {
    return this.readPkceStash()?.returnUrl ?? '';
  }

  private exchangeCodeForToken(code: string, verifier: string): Observable<OAuthTokenResponse> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', environment.oauth.clientId)
      .set('code', code)
      .set('code_verifier', verifier)
      .set('redirect_uri', this.getRedirectUri());

    return this.http.post<OAuthTokenResponse>(
      `${this.apiUrl}${environment.oauth.tokenUrl}`,
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
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

  private openLoginPopup(authorizeUrl: string): Window | null {
    const width = 480;
    const height = 640;
    const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
    const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);
    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    const popup = window.open(authorizeUrl, 'xinshi-login', features);
    popup?.focus();
    return popup;
  }

  /**
   * Settles once the login popup finishes, so the caller can leave its pending state instead of
   * waiting forever when the popup is blocked, dismissed, or simply left open.
   */
  private runLoginPopup(authorizeUrl: string, signal?: AbortSignal): Promise<void> {
    const popup = this.openLoginPopup(authorizeUrl);
    if (!popup) {
      return Promise.reject(new Error(OAUTH_POPUP_BLOCKED));
    }
    return new Promise<void>((resolve, reject) => {
      let poll = 0;
      let timeout = 0;
      let settled = false;
      const sub = new Subscription();

      const settle = (finish: () => void): void => {
        if (settled) {
          return;
        }
        settled = true;
        window.clearInterval(poll);
        window.clearTimeout(timeout);
        sub.unsubscribe();
        signal?.removeEventListener('abort', onAbort);
        finish();
      };
      // Nothing left to report to, so stop watching without disturbing the popup itself.
      function onAbort(): void {
        settle(resolve);
      }

      // The popup stores the session and broadcasts the login before closing itself, so the
      // broadcast is the success signal; `closed` alone cannot tell success from a dismissal.
      sub.add(
        this.userSub$.subscribe(user => {
          if (user) {
            settle(resolve);
          }
        })
      );
      poll = window.setInterval(() => {
        if (!popup.closed) {
          return;
        }
        // A browser without BroadcastChannel never broadcasts, so the cookie is the fallback proof.
        settle(this.getStoredUser() ? resolve : () => reject(new Error(OAUTH_POPUP_CLOSED)));
      }, POPUP_POLL_MS);
      // The popup is left open on purpose: the user may still finish there, and the broadcast
      // listener in this tab keeps working even after the caller stopped waiting.
      timeout = window.setTimeout(
        () => settle(() => reject(new Error(OAUTH_POPUP_TIMEOUT))),
        POPUP_MAX_WAIT_MS
      );
      signal?.addEventListener('abort', onAbort);
    });
  }

  processTokenAndLogin(tokenData: OAuthTokenResponse): Observable<boolean> {
    return this.getCurrentUserProfile(tokenData).pipe(
      switchMap(profile =>
        this.getCurrentUserById(String(profile.uid), tokenData).pipe(
          map(userProfile => {
            const tokenUser: TokenUser = {
              access_token: tokenData.access_token,
              refresh_token: tokenData.refresh_token ?? '',
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

  /**
   * Refetches the profile behind the stored token and re-emits it to `userSub$`.
   *
   * Cold on purpose: callers that have to know when the refreshed profile landed (e.g. the
   * settings form resyncing its inputs) subscribe and read the emitted user, instead of waiting
   * for the next `userSub$` emission — that one may well be an unrelated refresh carrying the
   * pre-update cookie copy.
   */
  updateUser(data: TokenUser): Observable<IUser> {
    const {
      current_user: { uid },
    } = data;
    return this.getCurrentUserById(uid, data).pipe(
      take(1),
      map(user => this.loginUser(data, user))
    );
  }

  editingUser(user: IUser, data: JsonObject): Observable<unknown> {
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

  applyRefreshedToken(tokenData: OAuthTokenResponse): IUser | null {
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

  refreshAccessToken(): Observable<OAuthTokenResponse | null> {
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

    return this.http.post<OAuthTokenResponse>(
      `${this.apiUrl}${environment.oauth.tokenUrl}`,
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  refreshLocalUser(user: IUser): void {
    this.userSub$.next(user);
    this.setUserCookie(user);
  }

  checkShow(content: RoleRestrictedContent | null | undefined, user: IUser | undefined): boolean {
    // Hide when there is no content
    if (!content) {
      return false;
    }
    const roles = content.params?.reqRoles;
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

  loginUser(data: TokenUser, user: IUserProfile): IUser {
    // Emit a copy, not an in-place merge: data is often the object already held by the USER
    // signal, and re-emitting the same reference would not notify signal consumers
    const currentUser: IUser = Object.assign({}, data, user);
    this.userSub$.next(currentUser);
    this.setUserCookie(currentUser);
    this.broadcastAuth({ type: 'login' });
    return currentUser;
  }

  logoutUser(): void {
    this.userSub$.next(false);
    this.cookieService.delete(this.localUserKey, '/');
    this.broadcastAuth({ type: 'logout' });
  }

  logout(): void {
    if (!this.isBrowser) {
      this.logoutUser();
      return;
    }
    // Ordering matters: the request is authorized with the stored token, so the local state can
    // only be dropped once the server has answered.
    this.destroyDrupalSession().subscribe(() => {
      this.logoutUser();
      this.router.navigateByUrl('/home');
    });
  }

  /**
   * Ends the Drupal session that `/oauth/authorize` opened. Without it the session outlives the
   * app's own logout, and the next authorize request answers with a code for the account that just
   * left — so a federated `idp` login never reaches its provider and silently returns the previous
   * user. Core's `/user/logout` cannot be used from here: it needs a CSRF token derived from the
   * session, and `/session/token` only mints the one for the `X-CSRF-Token` header.
   *
   * Best-effort by design — a backend without the endpoint, or an access token too stale to
   * authorize the call, must not trap the user in a logged-in UI.
   */
  private destroyDrupalSession(): Observable<unknown> {
    return this.http
      .post(`${this.apiUrl}${environment.oauth.logoutPath}`, null, { withCredentials: true })
      .pipe(
        timeout(LOGOUT_TIMEOUT_MS),
        catchError(error => {
          console.error('Failed to end the Drupal session:', error);
          return of(null);
        })
      );
  }

  getCode(phone: string): Observable<OtpResult> {
    return this.http
      .post<OtpGenerateResponse>(
        appendQueryParams(`${this.apiUrl}/api/v3/otp/generate`, { format: 'json' }),
        {
          mobile_number: phone,
        }
      )
      .pipe(
        // Backend returns HTTP 200 with { status: false, code, message } when no SMS was sent.
        map(response =>
          response?.status === false
            ? { ok: false, code: response.code, message: response.message }
            : { ok: true }
        ),
        catchError(error => {
          console.error('Send code failed:', error);
          // Throttling answers 429, so the status is what tells it apart from a plain failure.
          return of({
            ok: false,
            code: error?.error?.code,
            message: error?.error?.message,
            status: error?.status,
          });
        })
      );
  }

  loginByPhone(phone: number, code: string): Observable<OtpResult> {
    const authParams = environment.oauth.clientId
      ? { grant_type: 'oauth2', client_id: environment.oauth.clientId }
      : {};

    return this.http
      .post<PhoneLoginResponse>(`${this.apiUrl}/api/v3/otp/login`, {
        mobile_number: phone,
        code,
        ...authParams,
      })
      .pipe(
        switchMap(response => {
          // Backend returns HTTP 200 with { status: false, code, message } on failure.
          if (response?.status === false) {
            return of({ ok: false, code: response.code, message: response.message });
          }
          if (environment.oauth.clientId) {
            if (!response?.access_token) {
              console.error('Phone login succeeded but no token was returned');
              return of({ ok: false });
            }
            return this.processTokenAndLogin(response as OAuthTokenResponse).pipe(
              map(ok => ({ ok }))
            );
          }
          this.updateUser(response as TokenUser).subscribe();
          return of({ ok: true });
        }),
        catchError(error => {
          console.error('Phone login failed:', error);
          return of({
            ok: false,
            code: error?.error?.code,
            message: error?.error?.message,
            status: error?.status,
          });
        })
      );
  }

  getUserConfig(): Observable<IUserConfig> {
    if (environment.production) {
      return this.http.get<IUserConfig>(
        appendQueryParams(`${this.apiUrl}/api/v3/landingPage`, { content: '/core/user' })
      );
    } else {
      return this.http.get<IUserConfig>(`${this.apiUrl}/assets/app/core/user.json`);
    }
  }

  getUserById(id: string): Observable<DrupalUserListResponse> {
    const params = buildQueryString(
      {
        'filter[drupal_internal__uid]': id,
        include: 'user_picture,roles',
        jsonapi_include: 1,
      },
      { encodeKeys: false }
    );
    return this.http.get<DrupalUserListResponse>(appendQueryParams(this.userApiPath, params), {
      headers: this.optionsWithBearerToken().headers as HttpHeaders,
    });
  }

  getUser(params: QueryParams | string): Observable<DrupalUserListResponse> {
    return this.http.get<DrupalUserListResponse>(
      appendQueryParams(this.userApiPath, params, {
        arrayFormat: 'plus',
        encodeKeys: false,
      })
    );
  }

  getCurrentUserProfile(tokenData: OAuthTokenResponse): Observable<AccountProfileResponse> {
    return this.http.get<AccountProfileResponse>(
      appendQueryParams(`${this.apiUrl}/api/v3/accountProfile`, { noCache: 1 }),
      {
        headers: this.getAuthHeader(tokenData.access_token),
      }
    );
  }

  getAuthHeader(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    });
  }

  getCurrentUserById(uid: string, tokenData: OAuthTokenResponse): Observable<IUserProfile> {
    const params = buildQueryString(
      {
        'filter[drupal_internal__uid]': uid,
        include: 'user_picture,roles',
        jsonapi_include: 1,
        noCache: 1,
      },
      { encodeKeys: false }
    );
    return this.http
      .get<UserProfileResponse>(appendQueryParams(this.userApiPath, params), {
        headers: this.getAuthHeader(tokenData.access_token),
      })
      .pipe(
        catchError(() => {
          return this.http.get<UserProfileResponse>(
            appendQueryParams(`${this.apiUrl}/api/v3/personalProfile`, { noCache: 1 }),
            {
              headers: this.getAuthHeader(tokenData.access_token),
            }
          );
        }),
        map(res => {
          // jsonapi
          if (this.isDrupalUserListResponse(res)) {
            const detail = res.data[0];
            return {
              id: detail.id,
              // The settings form writes the nickname to full_name; core display_name is the fallback
              display_name: detail.full_name || detail.display_name || '',
              mail: detail.mail || '',
              authenticated: true,
              picture: detail.user_picture?.uri?.url || this.coreConfig?.defaultAvatar || '',
              login: detail.login || new Date().toISOString(),
              roles: (Array.isArray(detail?.roles) ? detail.roles : []).map(
                role => role.meta?.drupal_internal__target_id || ''
              ),
            };
          } else {
            const profile = res as PersonalProfileResponse;
            return {
              id: profile.uid,
              display_name: profile.name,
              mail: profile.mail || '',
              authenticated: true,
              picture: profile.avatar || this.coreConfig?.defaultAvatar || '',
              login: new Date().toISOString(),
              roles: profile.roles || [],
            };
          }
        })
      );
  }

  private isDrupalUserListResponse(
    res: UserProfileResponse
  ): res is DrupalUserListResponse & { data: NonNullable<DrupalUserListResponse['data']> } {
    return Array.isArray((res as DrupalUserListResponse).data);
  }

  setUserCookie(user: IUser): void {
    // Drupal default cookie_lifetime is 2000000; if it changes, keep this in sync
    this.cookieService.set(this.localUserKey, this.cryptoJS.encrypt(JSON.stringify(user)), {
      expires: getCookieExpirationDate(this.coreConfig.cookieLifetime ?? 2000000),
      path: '/',
      sameSite: 'Lax',
      secure: this.isBrowser && this.doc.location.protocol === 'https:',
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

  get userPage(): string[] {
    return [`/me`];
  }

  get userLink(): string[] {
    return ['/me/login'];
  }

  uploadUserPicture(user: IUser, imageData: string | ArrayBuffer): Observable<unknown> {
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
