import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AppState } from '../mobx/AppState';
import { forkJoin } from 'rxjs';
import { Observable, of } from 'rxjs';
import { IApiUrl } from '../mobx/IAppConfig';
import { map, switchMap } from 'rxjs/operators';
import { isEmpty } from 'lodash-es';
import { UserState } from '@core/mobx/user/UserState';
import { IArticleAccess } from '@core/interface/node/IArticle';
import { ICommentContent } from '@core/interface/node/INode';
import { formatDate } from '@angular/common';
import { CORE_CONFIG } from '@core/token/core.config';
import { ICoreConfig } from '@core/mobx/IAppConfig';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class NodeService extends ApiService {
  public responseCache = new Map();

  constructor(
    private appState: AppState,
    public http: HttpClient,
    private userState: UserState,
    public storage: LocalStorageService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {
    super();
  }

  get apiUrlConfig(): IApiUrl {
    return this.coreConfig.apiUrl;
  }

  search(type: string, params: string, token?: string): Observable<any> {
    const key = JSON.stringify({ api: this.apiUrl, type, params });
    const searchFormCache = this.responseCache.get(key);
    if (searchFormCache && environment.cache) {
      return of(searchFormCache);
    }
    let apiParams = '';
    if (type.startsWith('/api/v1/')) {
      apiParams = `${this.apiUrl}${type}?${params}`;
    } else {
      apiParams = `${this.apiUrl}/api/v1/${type}?${params}`;
    }
    // search for role
    const searchForRole = this.coreConfig?.apiUrl?.search;
    if (searchForRole && apiParams.indexOf('/api/v1/content')) {
      Object.keys(searchForRole).some((role) => {
        if (this.userState.roles.includes(role)) {
          apiParams = apiParams.replace('/api/v1/content', searchForRole[role]);
          return true;
        }
        return false;
      });
    }

    const response = this.http
      .get<any>(
        apiParams,
        token ? this.optionsWithCookieAndToken(token) : this.httpOptionsOfCommon
      )
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

  getNodes(
    path: string,
    type: string,
    params: string = '',
    token: string = ''
  ): Observable<any> {
    const cacheKey = JSON.stringify({ api: this.apiUrl, path, type, params });
    const nodeCache = this.responseCache.get(cacheKey);
    if (nodeCache && environment.cache) {
      return of(nodeCache);
    } else {
      return this.http
        .get<any>(
          `${this.apiUrl}${path}/${type}?${params}`,
          token
            ? this.optionsWithCookieAndToken(token)
            : this.httpOptionsOfCommon
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
    return attr?.path?.alias
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
  // TODO: refact updateComment and this to patch
  updateLawCase(data: any, uuid: string, token: string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/api/v1/node/case/${uuid}`,
      JSON.stringify(data),
      this.optionsWithCookieAndToken(token)
    );
  }

  replyComment(type: string, entityData: any, token: string): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.post<any>(
      `${this.apiUrl}${this.apiUrlConfig.commentGetPath}/${type}`,
      JSON.stringify(entity),
      this.optionsWithCookieAndToken(token)
    );
  }

  getCommentType(content: any): string {
    return content?.params?.comment?.attributes?.field_name || '';
  }

  getCommentRelEntityId(content: any): string {
    return content?.params?.comment?.relationships?.entity_id?.data?.id || '';
  }

  getCommentsParams(content: any, timeStamp: number): any {
    const type = this.getCommentType(content);
    return {
      path: this.apiUrlConfig.commentGetPath,
      type,
      params: [
        `filter[entity_id.id]=${this.getCommentRelEntityId(content)}`,
        `include=uid,uid.user_picture,pid`,
        `fields[user--user]=name,user_picture`,
        `fields[file--file]=uri,url`,
        `sort=-created`,
        // 'filter[status]=1',
        `jsonapi_include=1`,
        `timeStamp=${timeStamp}`,
      ].join('&'),
    };
  }

  getCommentsPidParams(pid: string, timeStamp: number): any {
    return [
      `filter[pid.id]=${pid}`,
      `include=uid,uid.user_picture,pid`,
      `fields[user--user]=name,user_picture`,
      `fields[file--file]=uri,url`,
      `sort=-created`,
      // 'filter[status]=1',
      `jsonapi_include=1`,
      `timeStamp=${timeStamp}`,
    ].join('&');
  }

  handleComment(comment: any, level: number): ICommentContent {
    return {
      author: {
        img: {
          src:
            comment.uid?.user_picture?.uri?.url || this.userState.defaultAvatar,
          style: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
          },
          alt: comment.uid.name,
        },
        align: 'center start',
        id: comment.uid.id,
        title: comment.uid.name,
        subTitle: formatDate(
          comment.changed || comment.created,
          'yyyy-MM-dd HH:mm:ss',
          'en-US'
        ),
      },
      time: comment.changed,
      id: comment.id,
      content: comment?.content?.processed || comment?.comment_body?.processed,
      child: [],
      level,
    };
  }

  // api 在有权限的时候会有很大的性能开销，可使用自定义api
  getCommentsWitchChild(
    content: any,
    token = '',
    timeStamp = 1
  ): Observable<any> {
    const path = this.apiUrlConfig.commentGetPath;
    const type = this.getCommentType(content);
    const { params } = this.getCommentsParams(content, timeStamp);
    return this.getNodes(path, type, params, token).pipe(
      switchMap((data: any) => {
        const lists = data.data
          .filter((list: any) => {
            // 过滤出父评论
            if (list.pid.id) {
              return false;
            } else {
              return true;
            }
          })
          .map((comment: any) => {
            return this.handleComment(comment, 1);
          });
        const obj: any = {};
        lists.map((item: any) => {
          // 获取每个评论下的回复
          obj[item.id] = this.getNodes(
            path,
            type,
            this.getCommentsPidParams(item.id, timeStamp),
            token
          ).pipe(
            map((childs: any) => {
              if (!childs.data) {
                return [];
              }
              return childs.data.map((child: any) => {
                return this.handleComment(child, 2);
              });
            })
          );
        });
        return forkJoin(obj).pipe(
          // 合并评论到其父评论
          map((comments: any) => {
            return lists.map((item: any) => {
              return Object.assign(item, { child: comments[item.id] });
            });
          })
        );
      })
    );
  }

  // custom get comment api
  getCustomApiComment(
    uuid: string,
    timeStamp = 1,
    token?: string
  ): Observable<any> {
    const key = JSON.stringify({ api: this.apiUrl, uuid, timeStamp });
    const cache = this.responseCache.get(key);
    const params = [`timeStamp=${timeStamp}`].join('&');
    if (cache && environment.cache) {
      return of(cache);
    }
    return this.http
      .get(
        `${this.apiUrl}/api/v3/comment/comment/${uuid}?${params}`,
        token ? this.optionsWithCookieAndToken : this.httpOptionsOfCommon
      )
      .pipe(
        switchMap((res) => {
          this.responseCache.set(key, res);
          return of(res);
        })
      );
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
    return `${this.apiUrl}${this.coreConfig?.commerce?.payNode}/${entityId}`;
  }

  checkNodeAccess(params: any): Observable<IArticleAccess> {
    const reqPay = params?.pay;
    const reqRule = params?.require_rule;
    const reqMoney = reqPay?.money;
    const entityId =
      this.appState.pageConfig?.node?.entityId || params?.entityId;
    if (!isEmpty(reqRule) || reqPay) {
      // 非公开浏览
      const isReqRoles = this.checkReqRule(reqRule);
      // 是否可授权访问角色
      if (isReqRoles) {
        return of({
          canAccess: true,
          isReqRoles: true,
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
                  isReqRoles: false,
                  isPayed: true,
                  reqMoney,
                  payUrl: this.getPayUrl(entityId),
                };
              } else {
                // 未购买
                return {
                  canAccess: false,
                  isReqRoles: false,
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
            isReqRoles: false,
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
        isReqRoles: false,
        isPayed: false,
        reqMoney,
        payUrl: '',
      });
    }
  }
}
