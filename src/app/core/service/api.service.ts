import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CryptoJSService } from './crypto-js.service';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  localUserKey = `${environment.site}${environment.port}`;

  constructor(public cryptoJS: CryptoJSService) {}

  get apiUrl(): string {
    return environment.apiUrl;
  }

  get httpOptionsOfCommon(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
    return httpOptions;
  }

  optionsWithCookieAndToken(csrfToken: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': csrfToken,
      }),
      withCredentials: true,
    };
    return httpOptions;
  }
}
