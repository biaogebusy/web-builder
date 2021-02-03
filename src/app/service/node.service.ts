import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { mapValues } from 'lodash-es';
import { AppState } from '../mobx/AppState';
@Injectable({
  providedIn: 'root',
})
export class NodeService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private appState: AppState) { }

  getNodes(type: string, params: string = ''): Observable<any> {
    return this.http.get<any>(
      `
    ${this.apiService.apiUrl}${this.appState.apiUrl.nodeGetPath}/${type}?${params}`,
      this.apiService.httpOptions(this.apiService.csrfToken)
    );
  }

  getRelationships(relationships: any[]): Observable<any> {
    const obj = mapValues(relationships, (item) => {
      return this.apiService.getApi(item.links.related.href).pipe(
        map((res) => {
          return res.data;
        })
      );
    });
    return forkJoin(obj);
  }
}
