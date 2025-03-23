import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { NodeService } from './node.service';
import { User } from '../interface/IAppConfig';
import { USER } from '@core/token/token-providers';
import { IUser } from '@core/interface/IUser';

@Injectable({
  providedIn: 'root',
})
export class DataFetcherService extends ApiService {
  private http = inject(HttpClient);
  private nodeService = inject(NodeService);
  private readonly EXTERNAL_API = '/api/v1/node/article';
  private user$ = inject<Observable<IUser>>(USER);
  private user: IUser;

  constructor() {
    super();
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  transformExternalToLocal(extArticle: any): any {
    return {
      type: 'node--article',
      attributes: {
        title: extArticle.attributes.title,
        body: {
          value: extArticle.attributes.body.value,
          format: 'full_html',
        },
        created: new Date().toISOString(),
      },
    };
  }

  // 批量创建方法
  batchCreate(items: any[]): Observable<any> {
    return this.processInBatches(items, 5).pipe(catchError(this.handleBatchError));
  }

  // 分批处理逻辑
  private processInBatches(items: any[], batchSize: number): Observable<any> {
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      batches.push(batch);
    }

    return forkJoin(
      batches.map(batch =>
        forkJoin(
          batch.map(item =>
            this.createSingleItem(item).pipe(
              catchError(error => this.handleSingleError(error, item))
            )
          )
        )
      )
    );
  }

  // 创建单个条目
  private createSingleItem(item: any): Observable<any> {
    const { attributes } = item;
    return this.nodeService.addEntify('/api/v1/node/article', attributes, this.user.csrf_token);
  }

  // 错误处理（批量）
  private handleBatchError(error: HttpErrorResponse): any {
    const errorMessage = `批量操作失败: ${error.status} - ${error.message}`;
    return throwError(() => new Error(errorMessage));
  }

  // 错误处理（单个）
  private handleSingleError(error: any, originalItem: any): any {
    return throwError(() => ({
      error,
      originalItem,
      message: `创建失败: ${error.message || '未知错误'}`,
    }));
  }
}
