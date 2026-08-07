import { DestroyRef, ElementRef, Injectable, Injector, inject } from '@angular/core';
import { HttpResourceRef, httpResource } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from './api.service';
import { forkJoin, Observable, of } from 'rxjs';
import { isEmpty } from 'lodash-es';
import type { IArticleAccess } from '@core/interface/node/IArticle';
import type { IComment } from '@core/interface/node/INode';
import type { IUser } from '@core/interface/IUser';
import { BuilderState } from '@core/state/BuilderState';
import { IMediaAttr } from '@core/interface/manage/IManage';
import { appendQueryParams, QueryParams } from '@core/util/http-params.util';
import { resolveNodeLangCode } from '@core/util/node-lang.util';
import { environment } from 'src/environments/environment';
import { CommentService } from './comment.service';
import { getLangPrefix } from '@core/util/language.util';
import { MediaUploadService } from './media-upload.service';

export type ApiQueryParams = QueryParams | string | null | undefined;

export interface IFetchResourceRequest {
  api: string;
  params?: ApiQueryParams;
  langCode?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NodeService extends ApiService {
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);

  private builder = inject(BuilderState);
  private commentService = inject(CommentService);
  private mediaUploadService = inject(MediaUploadService);

  constructor() {
    super();
  }

  fetch(api: string, params: ApiQueryParams = '', langCode?: string): Observable<any> {
    if (!api) {
      return of(false);
    }
    return this.http.get<any>(this.buildFetchUrl(api, params, langCode), this.httpOptionsOfCommon);
  }

  // Declarative counterpart of fetch(): re-requests whenever signals read in `request` change.
  // Return undefined from `request` to skip fetching (e.g. no api configured yet).
  fetchResource(request: () => IFetchResourceRequest | undefined): HttpResourceRef<any> {
    return httpResource(
      () => {
        const req = request();
        if (!req?.api) {
          return undefined;
        }
        return {
          url: this.buildFetchUrl(req.api, req.params ?? '', req.langCode),
          headers: this.httpOptionsOfCommon.headers,
        };
      },
      { injector: this.injector }
    );
  }

  private buildFetchUrl(api: string, params: ApiQueryParams, langCode?: string): string {
    let apiPath = '';
    let lang = '';
    if (langCode) {
      lang = getLangPrefix({ langCode });
    }
    if (api.startsWith('/api/')) {
      apiPath = `${this.apiUrl}${lang}${api}`;
    } else {
      apiPath = `${this.apiUrl}${lang}/api/v1/${api}`;
    }
    return appendQueryParams(apiPath, params, {
      arrayFormat: 'plus',
      encodeKeys: false,
    });
  }

  resolveLangCode(elementRef?: ElementRef): string | undefined {
    return resolveNodeLangCode({
      pageUrl: this.pageUrl,
      builderLangcode: this.builder.currentPage?.langcode,
      inCanvas: !!elementRef?.nativeElement.closest('.component-item'),
      multiLang: environment.multiLang,
      languages: environment.langs,
    });
  }

  getNodeByLink(link: string): Observable<any> {
    return this.http.get<any>(`${link}`);
  }

  // params can use for noCache
  getNodes(path: string, type: string, params: ApiQueryParams = ''): Observable<any> {
    const apiPath = `${this.apiUrl}${path}/${type}`;
    return this.http.get<any>(
      appendQueryParams(apiPath, params, {
        arrayFormat: 'plus',
        encodeKeys: false,
      }),
      this.httpOptionsOfCommon
    );
  }

  /**
   * 批量删除节点
   * @param entity type 内容类型 (如: 'node--article')
   * @param uuids 要删除的节点 UUID 数组
   */
  batchDeleteNodes(entityType: string, uuids: string[]): Observable<any[]> {
    if (uuids.length === 0) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    const path = entityType.replace('--', '/');
    // 为每个 UUID 创建删除请求
    const deleteRequests = uuids.map(uuid => this.deleteEntity(path, uuid));

    // 使用 forkJoin 并行执行所有删除请求
    return forkJoin(deleteRequests);
  }

  deleteEntity(path: string, id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${path}/${id}`, this.optionsWithBearerToken());
  }

  // path: /api/v1/taxonomy_term/page_group
  addEntity(path: string, attr: any, relationships?: any): Observable<any> {
    const post = {
      data: {
        type: this.getEntityType(path),
        attributes: {
          ...attr,
        },
        ...(relationships && Object.keys(relationships).length > 0 ? { relationships } : {}),
      },
    };
    return this.http.post<any>(
      `${this.apiUrl}${path}`,
      JSON.stringify(post),
      this.optionsWithBearerToken()
    );
  }

  getEntityType(path: string): string {
    const arr = path.split('/');
    return `${arr[arr.length - 2]}--${arr[arr.length - 1]}`;
  }

  updateEntity(path: string, uuid: string, attr: any, relationships?: any): Observable<any> {
    const post = {
      data: {
        type: this.getEntityType(path),
        id: uuid,
        attributes: {
          ...attr,
        },
        ...(relationships && Object.keys(relationships).length > 0 ? { relationships } : {}),
      },
    };
    return this.http.patch<any>(
      `${this.apiUrl}${path}/${uuid}`,
      JSON.stringify(post),
      this.optionsWithBearerToken()
    );
  }

  getNodePath(attr: any): string {
    return attr?.path?.alias ? attr.path.alias : `/node/${attr.drupal_internal__nid}`;
  }

  addComment(type: string, entityData: any, token: string): Observable<any> {
    return this.commentService.addComment(type, entityData, token);
  }

  updateComment(type: string, entityData: any, uuid: string, token: string): Observable<any> {
    return this.commentService.updateComment(type, entityData, uuid, token);
  }

  replyComment(type: string, entityData: any, token: string): Observable<any> {
    return this.commentService.replyComment(type, entityData, token);
  }

  getCommentType(content: any): string {
    return this.commentService.getCommentType(content);
  }

  getCommentRelEntityId(content: any): string {
    return this.commentService.getCommentRelEntityId(content);
  }

  getCommentsParams(content: any, timeStamp: number): any {
    return this.commentService.getCommentsParams(content, timeStamp);
  }

  getCommentsPidParams(pid: string, timeStamp: number): string {
    return this.commentService.getCommentsPidParams(pid, timeStamp);
  }

  handleComment(comment: any, level: number): IComment {
    return this.commentService.handleComment(comment, level);
  }

  // api 在有权限的时候会有很大的性能开销，可使用自定义api
  getCommentsWitchChild(content: any, timeStamp = 1): Observable<any> {
    return this.commentService.getCommentsWitchChild(content, timeStamp);
  }

  // custom get comment api
  getCustomApiComment(uuid: string, timeStamp = 1): Observable<any> {
    return this.commentService.getCustomApiComment(uuid, timeStamp);
  }

  deleteFlagging(path: string, items: any[]): Observable<any> {
    const obj: any = {};
    items.forEach(item => {
      const id = item.uuid || item.id;
      obj[id] = this.http.delete<any>(`${this.apiUrl}${path}/${id}`, this.optionsWithBearerToken());
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

  uploadImage(fileName: string, imageData: any): Observable<IMediaAttr> {
    return this.mediaUploadService.uploadImage(fileName, imageData, data =>
      this.createMediaImage(data)
    );
  }

  createMediaImage(data: any): Observable<void> {
    return this.mediaUploadService.createMediaImage(data);
  }

  imageHandler(editor: any): void {
    this.mediaUploadService.imageHandler(editor, (fileName, imageData) =>
      this.uploadImage(fileName, imageData)
    );
  }
}
