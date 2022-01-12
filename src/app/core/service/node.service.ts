import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { IUser } from '../mobx/user/IUser';
import { AppState } from '../mobx/AppState';
import { forkJoin } from 'rxjs';
import { Observable, of } from 'rxjs';
import { IApiUrl } from '../mobx/IAppConfig';
import { switchMap } from 'rxjs/operators';
import { ICommentRequest } from '@core/interface/node/IComment';
@Injectable({
  providedIn: 'root',
})
export class NodeService extends ApiService {
  public responseCache = new Map();

  constructor(
    public http: HttpClient,
    public storage: LocalStorageService,
    private appState: AppState
  ) {
    super(http, storage);
  }

  get apiUrlConfig(): IApiUrl {
    return this.appState.apiUrlConfig;
  }

  search(type: string, params: string): Observable<any> {
    const key = `${type}-${params}`;
    const searchFormCache = this.responseCache.get(key);
    if (searchFormCache) {
      return of(searchFormCache);
    }
    const response = this.http
      .get<any>(`${this.apiUrl}/api/v1/${type}?${params}`)
      .pipe(
        switchMap((res) => {
          this.responseCache.set(key, res);
          return of(res);
        })
      );
    return response;
  }

  getNodeByLink(link: string): Observable<any> {
    return this.http.get<any>(`${link}`);
  }

  getNodes(path: string, type: string, params: string = ''): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}${path}/${type}?${params}`,
      this.httpOptions
    );
  }

  deleteEntity(path: string, id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}${path}/${id}`,
      this.httpOptions
    );
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
      },
    };
    return this.http.post<any>(
      `${this.apiUrl}${this.apiUrlConfig.nodeGetPath}/${type}`,
      JSON.stringify(data),
      this.httpOptions
    );
  }

  addComment(type: string, entityData: any): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.post<any>(
      `${this.apiUrl}${this.apiUrlConfig.commentGetPath}/${type}`,
      JSON.stringify(entity),
      this.httpOptions
    );
  }

  updateComment(type: string, entityData: any, uuid: string): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.patch<any>(
      `${this.apiUrl}${this.apiUrlConfig.commentGetPath}/${type}/${uuid}`,
      JSON.stringify(entity),
      this.httpOptions
    );
  }

  getCommentRequestDate(meta: ICommentRequest): any {
    return {
      data: {
        type: `comment--${meta.type}`,
        attributes: {
          entity_type: 'node',
          field_name: meta.type,
          comment_body: meta.comment_body,
        },
        relationships: {
          comment_type: {
            data: {
              type: 'comment_type--comment_type',
              id: meta.commentTypeUuid,
            },
          },
          entity_id: {
            data: {
              type: `node--${meta.entityType}`,
              id: meta.nodeUuid,
            },
          },
        },
      },
    };
  }

  flagging(path: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${path}`, data, this.httpOptions);
  }

  deleteFlagging(path: string, items: any[]): Observable<any> {
    const obj: any = {};
    items.forEach((item) => {
      obj[item.id] = this.http.delete<any>(
        `${this.apiUrl}${path}/${item.id}`,
        this.httpOptions
      );
    });
    return forkJoin(obj);
  }
}
