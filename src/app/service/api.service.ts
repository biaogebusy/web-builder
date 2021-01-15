import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string;
  loginPath = '/user/login';
  userIdGetPath = '/jsonapi';
  nodeGetPath = '/jsonapi/node';
  userGetPath = '/jsonapi/user/user';
  jobNodeType = 'recruitment';
  localUserKey = 'currentUser';

  // nodeGetPath = 'http://localhost:3000/jobs';
  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.apiUrl = environment.apiUrl;
  }

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

  get csrfToken() {
    return this.getToken(this.localUserKey, 'csrf_token');
  }

  getApi(api: string): Observable<any> {
    return this.http.get<any>(api, this.httpOptions(this.csrfToken));
  }

  httpOptions(token: string) {
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
