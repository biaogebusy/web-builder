import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppState } from '../mobx/AppState';
import { IUser } from '../mobx/user/IUser';
import { Observable } from 'rxjs';
import { IApiUrl } from '../mobx/IAppConfig';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NodeService extends ApiService {
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
    return this.http.get<any>(`${this.apiUrl}/api/v1/${type}?${params}`);
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
    console.log(JSON.stringify(entity));
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
    console.log(obj);
    return forkJoin(obj);
  }
}
