import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, concatMap, delay, from, of } from 'rxjs';
import { ApiService } from './api.service';
import { NodeService } from './node.service';
import { USER } from '@core/token/token-providers';
import { IUser } from '@core/interface/IUser';
import { SubmissionItem } from '@core/interface/node/IDrupal';

@Injectable({
  providedIn: 'root',
})
export class DataFetcherService extends ApiService {
  private nodeService = inject(NodeService);
  private user$ = inject<Observable<IUser>>(USER);
  private user: IUser;
  private api = '';
  private readonly defaultDelay = 800;

  constructor() {
    super();
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  transformExternalToLocal(extArticle: any, api: string): SubmissionItem {
    this.api = api;
    const { title, body, drupal_internal__nid, created, langcode } = extArticle.attributes;
    return {
      id: extArticle.id,
      status: false,
      type: this.nodeService.getEntityType(api),
      title,
      body: body.processed,
      nid: drupal_internal__nid,
      created,
      langcode,
      attributes: {
        title: extArticle.attributes.title,
        body: {
          value: extArticle.attributes.body.value,
          format: 'full_html',
        },
      },
    };
  }

  sequentialSubmit(
    items: SubmissionItem[],
    delayMs: number = this.defaultDelay
  ): Observable<{ success: boolean; index: number; item?: SubmissionItem }> {
    return from(items).pipe(concatMap((item, index) => this.submitItem(item, index, delayMs)));
  }

  private submitItem(
    item: SubmissionItem,
    index: number,
    delayMs: number
  ): Observable<{ success: boolean; index: number; item?: SubmissionItem }> {
    const { attributes } = item;
    return this.nodeService.addEntity(this.api, attributes, this.user.csrf_token).pipe(
      delay(delayMs),
      concatMap(res =>
        of({
          success: res.success,
          index: index + 1,
          item: res.success ? undefined : item,
        })
      ),
      catchError((err: HttpErrorResponse) => {
        return of({
          success: false,
          index: index + 1,
          item,
        });
      })
    );
  }
}
