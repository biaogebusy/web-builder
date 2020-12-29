import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://nnitpai-cms.zhaobg.com';
  loginPath = '/user/login';
  userIdGetPath = '/jsonapi';
  userGetPath = '/jsonapi/user-info';

  nodeGetPath = 'http://localhost:3000/jobs';
  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  getNodes() {
    return this.http.get(`${this.nodeGetPath}`);
  }

  nodeFilterByRegion(region: string) {
    return this.http.get(`${this.nodeGetPath}?region=${region}`);
  }

  getToken(item: string, key: string): any {
    if (this.storage.get(item)) {
      const token = JSON.parse(this.storage.get(item));
      return token[key];
    } else {
      return false;
    }
  }

  httpOptions(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': token,
      }),
      withCredentials: true,
    };
    return httpOptions;
  }

  login(userName: string, passWord: string) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.post<any>(
      `${this.apiUrl}${this.loginPath}?_format=json`,
      {
        name: userName,
        pass: passWord,
      },
      {
        headers,
        withCredentials: true,
      }
    );
  }

  getCurrentUserId(uid: string, item: string): Observable<any> {
    const csrfToken = this.getToken(item, 'csrf_token');
    return this.http
      .get<any>(
        `${this.apiUrl}${this.userGetPath}?filter[drupal_internal__uid]=${uid}`,
        this.httpOptions(csrfToken)
      )
      .pipe(
        map((res) => {
          return {
            id: res.data[0].id,
          };
        })
      );
  }

  getUser(id: string, item: string): Observable<any> {
    const csrfToken = this.getToken(item, 'csrf_token');
    return this.http
      .get<any>(
        `${this.apiUrl}${this.userGetPath}?filter[id]=${id}`,
        this.httpOptions(csrfToken)
      )
      .pipe(
        map((user) => {
          const detail = user.data[0];
          const info = detail.attributes;

          return {
            id: detail.id,
            display_name: info.display_name,
            mail: info.mail,
            authenticated: true,
          };
        })
      );
  }
}
