import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { TokenUser } from '../mobx/user/IUser';
import { AppState } from '../mobx/AppState';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  constructor(
    public http: HttpClient,
    public storage: LocalStorageService,
    private apiService: ApiService,
    private appState: AppState
  ) {
    super(http, storage);
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
      `${this.apiService.apiUrl}${this.appState.apiUrlConfig.loginPath}?_format=json`,
      {
        name: userName,
        pass: passWord,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    const api = this.apiService;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      withCredentials: true,
    };
    const logoutToken = api.getToken(api.localUserKey, 'logout_token');
    const params = ['_format=json', `token=${logoutToken}`].join('&');
    return this.http.post(
      `${this.apiService.apiUrl}${this.appState.apiUrlConfig.logoutPath}?${params}`,
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

    return this.http.post(
      `${this.apiService.apiUrl}/api/v1/otp/generate?format=json`,
      {
        mobile_number: phone,
      }
    );
  }

  loginByPhone(phone: number, code: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http.post(
      `${this.apiService.apiUrl}/api/v1/otp/login?format=json`,
      {
        mobile_number: phone,
        code,
      }
    );
  }

  getUserById(id: string): Observable<any> {
    const apiUrl = `${this.apiUrl}${this.appState.apiUrlConfig.userGetPath}`;
    const params = [
      `filter[drupal_internal__uid]=${id}`,
      `include=user_picture,roles`,
      `jsonapi_include=1`,
    ].join('&');
    return this.http.get<any>(
      `${apiUrl}?${params}`,
      this.apiService.httpOptions
    );
  }

  getCurrentUserById(user: TokenUser): Observable<any> {
    const apiUrl = `${this.apiUrl}${this.appState.apiUrlConfig.userGetPath}`;
    const params = [
      `filter[drupal_internal__uid]=${user.current_user.uid}`,
      `include=user_picture`,
    ].join('&');
    return this.http
      .get<any>(`${apiUrl}?${params}`, this.apiService.httpOptions)
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
