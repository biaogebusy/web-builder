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
    private appState: AppState
  ) {}

  get apiUrl(): string {
    return this.apiService.apiUrl;
  }

  search(keys: string, page: number): Observable<any> {
    const params = [`keys=${keys}`, `page=${page}`].join('&');
    return this.http.get<any>(`${this.apiUrl}/api/v1/content?${params}`);
  }

  getNodes(type: string, params: string = ''): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}${this.appState.apiUrlConfig.nodeGetPath}/${type}?${params}`,
      this.apiService.httpOptions(this.apiService.csrfToken)
    );
  }

  getTaxonomy(type: string, params: string = ''): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}${this.appState.apiUrlConfig.taxonomyGetPath}/${type}?${params}`,
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

  searchByKey(key: string): Observable<any> {
    const params = [`keys=${key}`].join('&');
    return this.http.get<any>(`${this.apiUrl}/api/v1/job?${params}`);
  }

  getNodePath(node: any): string {
    return node.path.alias
      ? node.path.alias
      : `/node/${node.drupal_internal__nid}`;
  }
}
