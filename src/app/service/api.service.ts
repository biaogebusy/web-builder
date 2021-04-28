import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string;
  jobNodeType = 'job';
  localUserKey = 'currentUser';

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getToken(item: string, key: string): any {
    if (this.storage.get(item)) {
      const token = JSON.parse(this.storage.get(item));
      return token[key];
    } else {
      return false;
    }
  }

  get csrfToken(): string {
    return this.getToken(this.localUserKey, 'csrf_token');
  }

  get logoutToken(): string {
    return this.getToken(this.localUserKey, 'logout_token');
  }

  getApi(api: string): Observable<any> {
    return this.http.get<any>(api, this.httpOptions(this.csrfToken));
  }

  httpOptions(token: string): any {
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
