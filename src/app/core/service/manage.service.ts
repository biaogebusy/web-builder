import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { API_URL, USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';

@Injectable({
  providedIn: 'root',
})
export class ManageService extends ApiService {
  constructor(
    public http: HttpClient,
    @Inject(API_URL) public apiBaseUrl: string,
    @Inject(USER) private user: IUser
  ) {
    super(apiBaseUrl);
  }

  getBlock(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/v1/block_content_type/block_content_type`,
      this.optionsWithCookieAndToken(this.user.csrf_token)
    );
  }
}
