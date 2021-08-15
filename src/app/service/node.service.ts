import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { mapValues } from 'lodash-es';
import { AppState } from '../mobx/AppState';
import { IUser } from '../mobx/user/IUser';
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

  get apiUrlConfig(): any {
    return this.appState.apiUrlConfig;
  }

  search(params: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/content?${params}`);
  }

  searchNode(params: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/content?${params}`);
  }

  getNodeByLink(link: string): Observable<any> {
    return this.http.get<any>(`${link}`);
  }

  getNodes(
    type: string,
    params: string = '',
    path: string = ''
  ): Observable<any> {
    switch (path) {
      case 'comment':
        return this.http.get<any>(
          `${this.apiUrl}${this.apiUrlConfig.commentGetPath}/${type}?${params}`,
          this.apiService.httpOptions
        );
        break;
      case 'taxonomy':
        return this.http.get<any>(
          `${this.apiUrl}${this.apiUrlConfig.taxonomyGetPath}/${type}?${params}`,
          this.apiService.httpOptions
        );
        break;
      default:
        return this.http.get<any>(
          `${this.apiUrl}${this.apiUrlConfig.nodeGetPath}/${type}?${params}`,
          this.apiService.httpOptions
        );
    }
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

  getNodePath(attr: any): string {
    return attr.path.alias
      ? attr.path.alias
      : `/node/${attr.drupal_internal__nid}`;
  }

  addNode(type: string, attr: any, user: IUser): Observable<any> {
    const data = {
      data: {
        type: `node--${type}`,
        attributes: {
          title: attr.title,
          body: {
            value: attr.body,
            format: 'plain_text',
          },
        },
        relationships: {
          uid: {
            data: {
              type: 'user--user',
              id: user.id,
            },
          },
        },
      },
    };
    return this.http.post<any>(
      `${this.apiUrl}${this.apiUrlConfig.nodeGetPath}/${type}`,
      data,
      this.apiService.httpOptions
    );
  }

  addComment(type: string, entityData: any): Observable<any> {
    const entity = {
      data: entityData,
    };
    console.log(JSON.stringify(entity));
    return this.http.post<any>(
      `${this.apiUrl}${this.apiUrlConfig.commentGetPath}/${type}`,
      JSON.stringify(entity),
      this.apiService.httpOptions
    );
  }

  updateComment(type: string, entityData: any, uuid: string): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.patch<any>(
      `${this.apiUrl}${this.apiUrlConfig.commentGetPath}/${type}/${uuid}`,
      JSON.stringify(entity),
      this.apiService.httpOptions
    );
  }
}
