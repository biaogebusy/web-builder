import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { forkJoin } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isEmpty } from 'lodash-es';
import type { IArticleAccess } from '@core/interface/node/IArticle';
import type { IComment } from '@core/interface/node/INode';
import { formatDate } from '@angular/common';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { IApiUrl, ICoreConfig } from '@core/interface/IAppConfig';
import { API_URL } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
@Injectable({
  providedIn: 'root',
})
export class NodeService extends ApiService {
  constructor(
    public http: HttpClient,
    public storage: LocalStorageService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(API_URL) public apiBaseUrl: string,
    @Inject(USER) private user: IUser
  ) {
    super(apiBaseUrl);
  }

  get apiUrlConfig(): IApiUrl {
    return this.coreConfig.apiUrl;
  }

  search(type: string, params: string, token?: string): Observable<any> {
    let apiParams = '';
    if (!type) {
      return of(false);
    }
    const hasApiParam = type.indexOf('?') > 0;
    if (type.startsWith('/api/')) {
      apiParams = hasApiParam
        ? `${this.apiUrl}${type}&${params}`
        : `${this.apiUrl}${type}?${params}`;
    } else {
      apiParams = hasApiParam
        ? `${this.apiUrl}/api/v1/${type}&${params}`
        : `${this.apiUrl}/api/v1/${type}?${params}`;
    }
    // search for role
    const searchForRole = this.coreConfig?.apiUrl?.search;
    if (searchForRole && apiParams.indexOf('/api/v1/content')) {
      Object.keys(searchForRole).some((role) => {
        if (!this.user || this.user.current_user.roles.includes(role)) {
          apiParams = apiParams.replace('/api/v1/content', searchForRole[role]);
          return true;
        }
        return false;
      });
    }

    return this.http.get<any>(
      apiParams,
      token ? this.optionsWithCookieAndToken(token) : this.httpOptionsOfCommon
    );
  }

  getNodeByLink(link: string): Observable<any> {
    return this.http.get<any>(`${link}`);
  }

  // params can use for noCache
  getNodes(
    path: string,
    type: string,
    params: string = '',
    token: string = ''
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}${path}/${type}?${params}`,
      token ? this.optionsWithCookieAndToken(token) : this.httpOptionsOfCommon
    );
  }

  deleteEntity(path: string, id: string, token: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}${path}/${id}`,
      this.optionsWithCookieAndToken(token)
    );
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

  handleComment(comment: any, level: number): IComment {
    return {
      author: {
        img: {
          src:
            comment.uid?.user_picture?.uri?.url ||
            this.coreConfig?.defaultAvatar,
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
  ): Observable<IComment[]> {
    const params = [`timeStamp=${timeStamp}`].join('&');

    return this.http
      .get(
        `${this.apiUrl}/api/v3/comment/comment/${uuid}?${params}`,
        token ? this.optionsWithCookieAndToken : this.httpOptionsOfCommon
      )
      .pipe(
        switchMap((res: any) => {
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
      const id = item.uuid || item.id;
      obj[id] = this.http.delete<any>(
        `${this.apiUrl}${path}/${id}`,
        this.optionsWithCookieAndToken(token)
      );
    });
    return forkJoin(obj);
  }

  checkReqRule(reqRules: string[], user: IUser): boolean {
    if (!user.authenticated) {
      return false;
    } else {
      const currentUserRule = user.current_user.roles;
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

  checkNodeAccess(
    params: any,
    entityId: string,
    user: IUser
  ): Observable<IArticleAccess> {
    const reqRule = params?.require_rule;
    if (!isEmpty(reqRule)) {
      // 非公开浏览
      const isReqRoles = this.checkReqRule(reqRule, user);
      // 是否可授权访问角色
      if (isReqRoles) {
        return of({
          canAccess: true,
          isReqRoles: true,
        });
      } else {
        return of({
          canAccess: false,
          isReqRoles: false,
        });
      }
    } else {
      // 公开浏览
      return of({
        canAccess: true,
        isReqRoles: false,
      });
    }
  }

  uploadImage(imageData: any, csrfToken: string): Observable<any> {
    console.log(imageData);
    return this.http
      .post('/api/v1/media/image/field_media_image', imageData, {
        headers: new HttpHeaders({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': 'file; filename="user.jpg"',
          'X-CSRF-Token': csrfToken,
        }),
        withCredentials: true,
      })
      .pipe(
        map((res: any) => {
          const {
            data: {
              attributes: { uri },
            },
          } = res;
          return uri.url;
        }),
        catchError(() => {
          return '';
        })
      );
  }
}
