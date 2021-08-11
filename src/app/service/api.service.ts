import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string;
  jobNodeType = 'job';
  localUserKey = 'currentUser';

  constructor(private http: HttpClient, private storage: LocalStorageService) {
    this.apiUrl = environment.apiUrl;
  }

  getToken(item: string, key: string): any {
    if (this.storage.retrieve(item)) {
      const token = JSON.parse(this.storage.retrieve(item));
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
    return this.http.get<any>(api, this.httpOptions);
  }

  get httpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': this.csrfToken,
      }),
      withCredentials: true,
    };
    return httpOptions;
  }
}
