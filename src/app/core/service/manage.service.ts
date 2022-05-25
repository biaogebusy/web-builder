import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ManageService extends ApiService {
  constructor(public http: HttpClient) {
    super();
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/file/file`);
  }
}
