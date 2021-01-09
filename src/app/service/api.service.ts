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
  userGetPath = '/jsonapi/user/user';

  nodeGetPath = 'http://localhost:3000/jobs';
  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

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

  httpOptions(token: string): Object {
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
}
