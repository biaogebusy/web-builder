import { Injectable, inject } from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IComment } from '@core/interface/node/INode';
import { CORE_CONFIG } from '@core/token/token-providers';
import { appendQueryParams } from '@core/util/http-params.util';
import {
  buildCommentsParams,
  buildCommentsPidParams,
  getCommentRelEntityId,
  getCommentType,
  mapComment,
} from '@core/util/node-comment.util';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends ApiService {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  private readonly commentGetPath = '/api/v1/comment';

  constructor() {
    super();
  }

  /** Reads the allowed body format for a new or existing comment. */
  getForm(type: string, uuid?: string): Observable<{
    key: string; textFormat: string; editor: 'rich_text' | 'plain_text' | 'json';
  }> {
    const path = `/api/v3/comment-form/${encodeURIComponent(type)}` +
      (uuid ? `/${encodeURIComponent(uuid)}` : '');
    return this.http.get<any>(`${this.apiUrl}${path}`, { headers: this.httpOptionsOfCommon.headers });
  }

  /** Creates a comment using the caller's permitted text format. */
  addComment(type: string, entityData: any): Observable<any> {
    return this.writeComment(type, entityData);
  }

  /** Updates body fields without changing the comment author. */
  updateComment(type: string, entityData: any, uuid: string): Observable<any> {
    return this.writeComment(type, entityData, uuid);
  }

  /** Replies using the same format policy as a new comment. */
  replyComment(type: string, entityData: any): Observable<any> {
    return this.writeComment(type, entityData);
  }

  private writeComment(type: string, entityData: any, uuid?: string): Observable<any> {
    return this.getForm(type, uuid).pipe(
      switchMap(schema => {
        const attributes = { ...entityData.attributes };
        const body = attributes.comment_body;
        if (body) {
          let value = body.value;
          if (schema.editor === 'plain_text' && body.format !== schema.textFormat) {
            // Rich editor HTML must become text before using a plain-text format.
            const template = this.document.createElement('template');
            template.innerHTML = String(value).replace(/<br\s*\/?>(?:\n)?|<\/p>/gi, '\n');
            value = template.content.textContent?.trim() ?? '';
          }
          delete attributes.comment_body;
          attributes[schema.key] = { value, format: schema.textFormat };
        }
        const relationships = { ...entityData.relationships };
        // Drupal assigns the authenticated author. Sending uid needs comment administration.
        delete relationships.uid;
        const data = { ...entityData, attributes, relationships };
        const path = `${this.apiUrl}${this.commentGetPath}/${type}` + (uuid ? `/${uuid}` : '');
        return uuid
          ? this.http.patch<any>(path, JSON.stringify({ data }), this.optionsWithBearerToken())
          : this.http.post<any>(path, JSON.stringify({ data }), this.optionsWithBearerToken());
      })
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
    const path = this.commentGetPath;
    const type = this.getCommentType(content);
    const { params } = this.getCommentsParams(content, timeStamp);
    return this.getCollection(path, type, params).pipe(
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
          obj[item.id] = this.getCollection(
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
}
