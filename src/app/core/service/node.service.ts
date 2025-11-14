import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isEmpty } from 'lodash-es';
import type { IArticleAccess } from '@core/interface/node/IArticle';
import type { IComment } from '@core/interface/node/INode';
import { formatDate } from '@angular/common';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { IApiUrl, ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from './utilities.service';
import { IMediaAttr } from '@core/interface/manage/IManage';
@Injectable({
  providedIn: 'root',
})
export class NodeService extends ApiService {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private user$ = inject<Observable<IUser>>(USER);

  private http = inject(HttpClient);
  private util = inject(UtilitiesService);
  private user: IUser;

  constructor() {
    super();
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  get apiUrlConfig(): IApiUrl {
    return this.coreConfig.apiUrl;
  }

  fetch(api: string, params: string, token?: string, langCode?: string): Observable<any> {
    let apiParams = '';
    let lang = '';
    if (!api) {
      return of(false);
    }
    if (langCode) {
      lang = `/${langCode}`;
    }
    const hasApiParam = api.indexOf('?') > 0;
    if (api.startsWith('/api/')) {
      apiParams = hasApiParam
        ? `${this.apiUrl}${lang}${api}&${params}`
        : `${this.apiUrl}${lang}${api}?${params}`;
    } else {
      apiParams = hasApiParam
        ? `${this.apiUrl}${lang}/api/v1/${api}&${params}`
        : `${this.apiUrl}${lang}/api/v1/${api}?${params}`;
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
  getNodes(path: string, type: string, params = '', token = ''): Observable<any> {
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

  // path: /api/v1/taxonomy_term/page_group
  addEntity(path: string, attr: any, token: string): Observable<any> {
    const post = {
      data: {
        type: this.getEntityType(path),
        attributes: {
          ...attr,
        },
      },
    };
    return this.http.post<any>(
      `${this.apiUrl}${path}`,
      JSON.stringify(post),
      this.optionsWithCookieAndToken(token)
    );
  }

  getEntityType(path: string): string {
    const arr = path.split('/');
    return `${arr[arr.length - 2]}--${arr[arr.length - 1]}`;
  }

  getNodePath(attr: any): string {
    return attr?.path?.alias ? attr.path.alias : `/node/${attr.drupal_internal__nid}`;
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

  updateComment(type: string, entityData: any, uuid: string, token: string): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.patch<any>(
      `${this.apiUrl}${this.apiUrlConfig.commentGetPath}/${type}/${uuid}`,
      JSON.stringify(entity),
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
          src: comment.uid?.user_picture?.uri?.url || this.coreConfig?.defaultAvatar,
          style: {
            borderRadius: '50%',
          },
          width: 40,
          height: 40,
          alt: comment.uid.name,
        },
        align: 'center start',
        id: comment.uid.id,
        title: comment.uid.name,
        subTitle: formatDate(comment.changed || comment.created, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      },
      time: comment.changed,
      id: comment.id,
      content: comment?.content?.processed || comment?.comment_body?.processed,
      child: [],
      level,
    };
  }

  // api 在有权限的时候会有很大的性能开销，可使用自定义api
  getCommentsWitchChild(content: any, token = '', timeStamp = 1): Observable<any> {
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
  getCustomApiComment(uuid: string, timeStamp = 1, token?: string): Observable<any> {
    const params = [`timeStamp=${timeStamp}`].join('&');

    return this.http.get<IComment[]>(
      `${this.apiUrl}/api/v3/comment/comment/${uuid}?${params}`,
      token ? this.optionsWithCookieAndToken : this.httpOptionsOfCommon
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
    items.forEach(item => {
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
        const isRule = currentUserRule.filter(role => reqRules.includes(role)).length > 0;
        return isRule;
      }
    }
  }

  checkNodeAccess(params: any, entityId: string, user: IUser): Observable<IArticleAccess> {
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

  uploadImage(fileName: string, imageData: any, csrfToken: string): Observable<IMediaAttr> {
    return this.http
      .post('/api/v1/media/image/field_media_image', imageData, {
        headers: new HttpHeaders({
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `file; filename="${encodeURIComponent(fileName)}"`,
          'X-CSRF-Token': csrfToken,
        }),
        withCredentials: true,
      })
      .pipe(
        // 使用 switchMap 来执行后续操作
        switchMap((res: any) => {
          const {
            data: { attributes },
          } = res;

          return this.createMediaImage(res.data).pipe(map(() => attributes as IMediaAttr));
        }),
        catchError(error => {
          console.error('Upload image failed:', error);
          return throwError(() => error);
        })
      );
  }

  createMediaImage(data: any): Observable<void> {
    const {
      id,
      attributes: { filename },
    } = data;
    const mediaData = {
      data: {
        type: 'media--image',
        attributes: { name: filename },
        relationships: {
          field_media_image: {
            data: { type: 'file--file', id },
          },
        },
      },
    };

    return this.http
      .post(`/api/v1/media/image`, mediaData, this.optionsWithCookieAndToken(this.user.csrf_token))
      .pipe(
        map(() => void 0),
        catchError(error => {
          console.error('Create media image failed:', error);
          return throwError(() => error);
        })
      );
  }

  imageHandler(editor: any): void {
    if (!this.user) {
      this.util.openSnackbar('请登录后上传图片！', 'ok');
      return;
    }
    const Imageinput: any = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    if (Imageinput.files) {
      Imageinput.addEventListener('change', () => {
        const file = Imageinput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const data = e.target.result;
            this.uploadImage(file.name, data, this.user.csrf_token).subscribe((img: IMediaAttr) => {
              const range = editor.getSelection(true);
              editor.insertEmbed(range.index, 'image', img.uri.url);
            });
          };
          reader.readAsArrayBuffer(file);
        }
      });
      Imageinput.click();
    }
  }
}
