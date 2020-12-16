import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  nodeGetPath = 'http://localhost:3000/jobs';
  constructor(private http: HttpClient) {}

  getNodes() {
    return this.http.get(`${this.nodeGetPath}`);
  }
}
