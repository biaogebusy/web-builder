import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FeiyanService {
  feiyanApi = 'http:localhost:4200';
  constructor(private http: HttpClient) {}

  trackPerson(): Observable<any> {
    return this.http.get(`${this.feiyanApi}`);
  }
}
