import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class NodeService {
  constructor(private apiService: ApiService, private http: HttpClient) {}

  getNodes(type: string): Observable<any[]> {
    return this.http
      .get<any>(
        `
    ${this.apiService.apiUrl}${this.apiService.nodeGetPath}/${type}`,
        this.apiService.httpOptions(this.apiService.csrfToken)
      )
      .pipe(
        map((res) => {
          console.log('node', res.data);
          return res.data;
        })
      );
  }

  getRelationshipsxx(api: string): Observable<any> {
    return this.http.get<any>(api, this.apiService.csrfToken);
  }

  getRelationships(relationships: any[]): Observable<any> {
    const obj = _.mapValues(relationships, (item) => {
      return this.apiService.getApi(item.links.related.href).pipe(
        map((res) => {
          return res.data;
        })
      );
    });
    return forkJoin(obj);
  }
}
