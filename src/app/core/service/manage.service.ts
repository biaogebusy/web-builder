import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { UserState } from '@core/mobx/user/UserState';

@Injectable({
  providedIn: 'root',
})
export class ManageService extends ApiService {
  constructor(public http: HttpClient, private userState: UserState) {
    super();
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/file/file`);
  }

  getBlock(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/api/v1/block_content_type/block_content_type`,
      this.optionsWithCookieAndToken(this.userState.csrfToken)
    );
  }
}
