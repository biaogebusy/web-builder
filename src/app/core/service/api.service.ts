import { HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@core/token/token-providers';
import { camelCase, result } from 'lodash-es';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public configLoadDone$ = new Subject();

  constructor(@Inject(API_URL) public apiBaseUrl: string) {}

  get apiUrl(): string {
    return this.apiBaseUrl;
  }

  get localUserKey(): string {
    return camelCase(this.apiBaseUrl.split('//')[1]);
  }

  get httpOptionsOfCommon(): any {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
  }

  optionsWithCookieAndToken(csrfToken: string): any {
    return {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': csrfToken,
      }),
      withCredentials: true,
    };
  }

  getParams(obj: any, key: string): any {
    return obj && obj.params && obj.params[key];
  }

  getDeepValue(obj: any, path: string): any {
    return result(obj, path);
  }
}
