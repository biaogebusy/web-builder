import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CryptoJSService } from './crypto-js.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ManageService extends ApiService {
  constructor(public http: HttpClient, public cryptoJS: CryptoJSService) {
    super(cryptoJS);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/file/file`);
  }
}
