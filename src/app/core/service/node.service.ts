import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AppState } from '../mobx/AppState';
import { forkJoin } from 'rxjs';
import { Observable, of } from 'rxjs';
import { IApiUrl } from '../mobx/IAppConfig';
import { map, switchMap } from 'rxjs/operators';
import { ICommentParams, ICommentRequest } from '@core/interface/node/IComment';
import { CryptoJSService } from './crypto-js.service';
import { isEmpty } from 'lodash-es';
import { UserState } from '@core/mobx/user/UserState';
import { IArticleAccess } from '@core/interface/node/IArticle';
@Injectable({
  providedIn: 'root',
})
export class NodeService extends ApiService {
  public responseCache = new Map();

  constructor(
    private appState: AppState,
    public cryptoJS: CryptoJSService,
    public http: HttpClient,
    private userState: UserState,
    public storage: LocalStorageService
  ) {
    super(cryptoJS);
  }

  get apiUrlConfig(): IApiUrl {
    return this.appState.apiUrlConfig;
  }

  search(type: string, params: string): Observable<any> {
    const key = JSON.stringify({ api: this.apiUrl, type, params });
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
    const cacheKey = JSON.stringify({ api: this.apiUrl, path, type, params });
    const nodeCache = this.responseCache.get(cacheKey);
    if (nodeCache) {
      return of(nodeCache);
    } else {
      return this.http
        .get<any>(
          `${this.apiUrl}${path}/${type}?${params}`,
          this.httpOptionsOfCommon
        )
        .pipe(
          switchMap((res) => {
            this.responseCache.set(cacheKey, res);
            return of(res);
          })
        );
    }
  }

  deleteEntity(path: string, id: string, token: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}${path}/${id}`,
      this.optionsWithCookieAndToken(token)
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

  addNode(type: string, attr: any, token: string): Observable<any> {
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
      this.optionsWithCookieAndToken(token)
    );
  }

  addComment(type: string, entityData: any, token: string): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.post<any>(
      `${this.apiUrl}${this.apiUrlConfig.commentGetPath}/${type}`,
      JSON.stringify(entity),
      this.optionsWithCookieAndToken(token)
    );
  }

  updateComment(
    type: string,
    entityData: any,
    uuid: string,
    token: string
  ): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.patch<any>(
      `${this.apiUrl}${this.apiUrlConfig.commentGetPath}/${type}/${uuid}`,
      JSON.stringify(entity),
      this.optionsWithCookieAndToken(token)
    );
  }

  getCommentRequestDate(meta: ICommentParams): ICommentRequest {
    return {
      type: `comment--${meta.type}`,
      attributes: null,
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
    };
  }

  getFlaging(path: string, params: string, token: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}${path}?${params}`,
      this.optionsWithCookieAndToken(token)
    );
  }

  flagging(path: string, data: any, token: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}${path}`,
      data,
      this.optionsWithCookieAndToken(token)
    );
  }

  deleteFlagging(path: string, items: any[], token: string): Observable<any> {
    const obj: any = {};
    items.forEach((item) => {
      obj[item.id] = this.http.delete<any>(
        `${this.apiUrl}${path}/${item.id}`,
        this.optionsWithCookieAndToken(token)
      );
    });
    return forkJoin(obj);
  }

  checkReqRule(reqRules: string[]): boolean {
    if (!this.userState.authenticated) {
      return false;
    } else {
      const currentUserRule = this.userState.roles;
      if (currentUserRule.includes('administrator')) {
        return true;
      } else {
        const isRule =
          currentUserRule.filter((role) => reqRules.includes(role)).length > 0;
        return isRule;
      }
    }
  }

  checkCurrentUserPayed(
    uid: string,
    entityId: string,
    token: string
  ): Observable<boolean> {
    const params = [
      `filter[uid.id]=${uid}`,
      `filter[entity_id]=${entityId}`,
    ].join('&');
    return this.getFlaging(this.apiUrlConfig?.paymentPath, params, token).pipe(
      map((res) => {
        if (res.data.length > 0) {
          return true;
        }
        console.log('用户没有购买！');
        return false;
      })
    );
  }

  getPayUrl(entityId: string): string {
    return `${this.apiUrl}${this.appState?.commerce?.payNode}/${entityId}`;
  }

  checkNodeAccess(params: any): Observable<IArticleAccess> {
    const reqPay = params?.pay;
    const reqRule = params?.require_rule;
    const reqMoney = reqPay?.money;
    const entityId =
      this.appState.pageConfig?.node?.entityId || params?.entityId;
    if (!isEmpty(reqRule) || reqPay) {
      // 非公开浏览
      const isReqRule = this.checkReqRule(reqRule);
      // 是否可授权访问角色
      if (isReqRule) {
        return of({
          canAccess: true,
          isReqRule: true,
          isPayed: false,
          reqMoney,
          payUrl: '',
        });
      } else {
        // 是否已购买
        if (reqPay && this.userState.authenticated) {
          return this.checkCurrentUserPayed(
            this.userState.currentUser.id,
            this.appState.pageConfig.node.entityId,
            this.userState.csrfToken
          ).pipe(
            map((payed) => {
              if (payed) {
                // 已购买
                return {
                  canAccess: true,
                  isReqRule: false,
                  isPayed: true,
                  reqMoney,
                  payUrl: this.getPayUrl(entityId),
                };
              } else {
                // 未购买
                return {
                  canAccess: false,
                  isReqRule: false,
                  isPayed: false,
                  reqMoney,
                  payUrl: this.getPayUrl(entityId),
                };
              }
            })
          );
        } else {
          return of({
            canAccess: false,
            isReqRule: false,
            isPayed: false,
            reqMoney,
            payUrl: this.getPayUrl(entityId),
          });
        }
      }
    } else {
      // 公开浏览
      return of({
        canAccess: true,
        isReqRule: false,
        isPayed: false,
        reqMoney,
        payUrl: '',
      });
    }
  }
}
