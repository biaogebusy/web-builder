import { Injectable, inject } from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IComment } from '@core/interface/node/INode';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { appendQueryParams, type QueryParams } from '@core/util/http-params.util';
import {
  buildCommentsParams,
  buildCommentsPidParams,
  getCommentRelEntityId,
  getCommentType,
  mapComment,
} from '@core/util/node-comment.util';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ApiService } from './api.service';

type ApiQueryParams = QueryParams | string | null | undefined;

@Injectable({
  providedIn: 'root',
})
export class CommentService extends ApiService {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private user = inject(USER);

  private readonly commentGetPath = '/api/v1/comment';

  constructor() {
    super();
  }

  addComment(type: string, entityData: any, token: string): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.post<any>(
      `${this.apiUrl}${this.commentGetPath}/${type}`,
      JSON.stringify(entity),
      this.optionsWithBearerToken()
    );
  }

  updateComment(type: string, entityData: any, uuid: string, token: string): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.patch<any>(
      `${this.apiUrl}${this.commentGetPath}/${type}/${uuid}`,
      JSON.stringify(entity),
      this.optionsWithBearerToken()
    );
  }

  replyComment(type: string, entityData: any, token: string): Observable<any> {
    const entity = {
      data: entityData,
    };
    return this.http.post<any>(
      `${this.apiUrl}${this.commentGetPath}/${type}`,
      JSON.stringify(entity),
      this.optionsWithBearerToken()
    );
  }

  getCommentType(content: any): string {
    return getCommentType(content);
  }

  getCommentRelEntityId(content: any): string {
    return getCommentRelEntityId(content);
  }

  getCommentsParams(content: any, timeStamp: number): any {
    return buildCommentsParams(content, timeStamp, this.commentGetPath);
  }

  getCommentsPidParams(pid: string, timeStamp: number): string {
    return buildCommentsPidParams(pid, timeStamp);
  }

  handleComment(comment: any, level: number): IComment {
    return mapComment(comment, level, this.coreConfig?.defaultAvatar);
  }

  getCommentsWitchChild(content: any, timeStamp = 1): Observable<any> {
    const user = this.user();
    const token = typeof user === 'object' ? user.access_token : undefined;
    const path = this.commentGetPath;
    const type = this.getCommentType(content);
    const { params } = this.getCommentsParams(content, timeStamp);
    return this.getNodes(path, type, params).pipe(
      switchMap((data: any) => {
        const lists = data.data
          .filter((list: any) => {
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
          obj[item.id] = this.getNodes(
            path,
            type,
            this.getCommentsPidParams(item.id, timeStamp)
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
          map((comments: any) => {
            return lists.map((item: any) => {
              return Object.assign(item, { child: comments[item.id] });
            });
          })
        );
      })
    );
  }

  getCustomApiComment(uuid: string, timeStamp = 1): Observable<any> {
    return this.http.get<IComment[]>(
      appendQueryParams(`${this.apiUrl}/api/v3/comment/comment/${uuid}`, { timeStamp }),
      this.httpOptionsOfCommon
    );
  }

  private getNodes(path: string, type: string, params: ApiQueryParams = ''): Observable<any> {
    const apiPath = `${this.apiUrl}${path}/${type}`;
    return this.http.get<any>(
      appendQueryParams(apiPath, params, {
        arrayFormat: 'plus',
        encodeKeys: false,
      }),
      this.httpOptionsOfCommon
    );
  }
}
