import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, concatMap, delay, forkJoin, from, of, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { NodeService } from './node.service';
import { User } from '../interface/IAppConfig';
import { USER } from '@core/token/token-providers';
import { IUser } from '@core/interface/IUser';
export interface SubmissionItem {
  source_id: string;
  title: string;
  content: string;
  original_data: {
    created: string;
    modified?: string;
    drupal_type: string;
  };
}

export interface SubmissionResponse {
  success: boolean;
  inserted_id?: string;
  error?: {
    code: string;
    message: string;
  };
}
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

  transformExternalToLocal(extArticle: any, api: string): any {
    this.api = api;
    return {
      type: this.nodeService.getEntityType(api),
      attributes: {
        title: extArticle.attributes.title,
        body: {
          value: extArticle.attributes.body.value,
          format: 'full_html',
        },
        created: new Date(),
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
    return this.nodeService.addEntity(this.api, item, this.user.csrf_token).pipe(
      delay(delayMs),
      concatMap(res =>
        of({
          success: res.success,
          index: index + 1,
          item: res.success ? undefined : item,
        })
      ),
      catchError((err: HttpErrorResponse) =>
        of({
          success: false,
          index: index + 1,
          item,
        })
      )
    );
  }
}
