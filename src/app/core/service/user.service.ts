import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { TokenUser, IUser } from '../mobx/user/IUser';
import { LocalStorageService } from 'ngx-webstorage';
import { CryptoJSService } from './crypto-js.service';
import { CORE_CONFIG } from '@core/token/core.config';
import type { ICoreConfig } from '@core/mobx/IAppConfig';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  constructor(
    public http: HttpClient,
    public storage: LocalStorageService,
    public cryptoJS: CryptoJSService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {
    super();
  }

  get userApiPath(): string {
    return `${this.apiUrl}${this.coreConfig.apiUrl.userGetPath}`;
  }

  login(userName: string, passWord: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-type': 'application/vnd.api+json',
      }),
      withCredentials: true,
    };

    return this.http.post<any>(
      `${this.apiUrl}${this.coreConfig.apiUrl.loginPath}?_format=json`,
      {
        name: userName,
        pass: passWord,
      },
      httpOptions
    );
  }

  logout(logoutToken: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
      }),
      withCredentials: true,
    };
    const params = ['_format=json', `token=${logoutToken}`].join('&');
    return this.http.post(
      `${this.apiUrl}${this.coreConfig.apiUrl.logoutPath}?${params}`,
      null,
      httpOptions
    );
  }

  getCode(phone: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http.post(`${this.apiUrl}/api/v1/otp/generate?format=json`, {
      mobile_number: phone,
    });
  }

  loginByPhone(phone: number, code: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http.post(`${this.apiUrl}/api/v1/otp/login?format=json`, {
      mobile_number: phone,
      code,
    });
  }

  getUserConfig(): Observable<any> {
    if (environment.production) {
      return this.http.get(
        `${environment.apiUrl}/api/v1/config?content=/core/user`
      );
    } else {
      return this.http.get(`${environment.apiUrl}/assets/app/core/user.json`);
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
      this.optionsWithCookieAndToken(crsfToken)
    );
  }

  getUser(params: string): Observable<any> {
    return this.http.get<any>(`${this.userApiPath}?${params}`);
  }

  getCurrentUserProfile(crsfToken: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/v1/accountProfile`,
      this.optionsWithCookieAndToken(crsfToken)
    );
  }

  getCurrentUserById(uid: string, token: string): Observable<any> {
    const params = [
      `filter[drupal_internal__uid]=${uid}`,
      `include=user_picture,roles`,
      `jsonapi_include=1`,
    ].join('&');
    return this.http
      .get<any>(
        `${this.userApiPath}?${params}`,
        this.optionsWithCookieAndToken(token)
      )
      .pipe(
        map((res: any) => {
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
        })
      );
  }

  storeLocalUser(user: IUser): void {
    this.storage.store(
      this.localUserKey,
      this.cryptoJS.encrypt(JSON.stringify(user))
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
      .get<any>(`${this.apiUrl}/user/login_status?_format=json`, httpOptions)
      .pipe(
        map((state) => {
          if (state) {
            return true;
          }
          return false;
        })
      );
  }
}
