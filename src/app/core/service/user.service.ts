import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { TokenUser, CurrentUser, IUser } from '../mobx/user/IUser';
import { AppState } from '../mobx/AppState';
import { LocalStorageService } from 'ngx-webstorage';
import { CryptoJSService } from './crypto-js.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  constructor(
    public http: HttpClient,
    public storage: LocalStorageService,
    private appState: AppState,
    public cryptoJS: CryptoJSService
  ) {
    super(cryptoJS);
  }

  get userApiPath(): string {
    return `${this.apiUrl}${this.appState.apiUrlConfig.userGetPath}`;
  }

  login(userName: string, passWord: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-type': 'application/json',
      }),
      withCredentials: true,
    };

    return this.http.post<any>(
      `${this.apiUrl}${this.appState.apiUrlConfig.loginPath}?_format=json`,
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
        'Content-type': 'application/json',
      }),
      withCredentials: true,
    };
    const params = ['_format=json', `token=${logoutToken}`].join('&');
    return this.http.post(
      `${this.apiUrl}${this.appState.apiUrlConfig.logoutPath}?${params}`,
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

  getCurrentUserById(user: TokenUser, crsfToken: string): Observable<any> {
    const params = [
      `filter[drupal_internal__uid]=${user.current_user.uid}`,
      `include=user_picture`,
    ].join('&');
    return this.http
      .get<any>(
        `${this.userApiPath}?${params}`,
        this.optionsWithCookieAndToken(crsfToken)
      )
      .pipe(
        map((res: any) => {
          const detail = res.data[0];
          const info = detail.attributes;
          const relate = res.included && res.included[0];
          return {
            id: detail.id,
            display_name: info.display_name,
            mail: info.mail,
            authenticated: true,
            picture: relate ? relate.attributes.uri.url : null,
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

  getLoginState(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.get<any>(
      `${this.apiUrl}/user/login_status?_format=json`,
      httpOptions
    );
  }
}
