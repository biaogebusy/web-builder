import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BtService {
  private BT_KEY = 'Qbfmbk63JqC1j1HsOHlOdFmrLsnRLlIC';
  private BT_PANEL = 'http://sits.zhaobg.com:9999/';
  constructor(private http: HttpClient) {}

  getKeyData(): Observable<any> {
    const nowTime = Date.now();
    const key = Md5.hashStr(this.BT_KEY);
    const token = Md5.hashStr(`${nowTime.toString()}${key}`);
    console.log(token);
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.post(
      `${this.BT_PANEL}data?action=getData`,
      {
        request_time: Date.now(),
        request_token: token,
      },
      {
        headers,
        withCredentials: true,
      }
    );
  }
}
