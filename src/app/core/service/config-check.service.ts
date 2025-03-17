import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CHECK_LIST, ApiEndpoint } from '@modules/builder/main/config-check/api-check-list';
import { Subject, concatMap, from, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigCheckService {
  private http = inject(HttpClient);
  private resultSubject = new Subject<ApiTestResult>();

  // 暴露结果流
  public results$ = this.resultSubject.asObservable();

  // 启动检测（使用RxJS流处理）
  startCheck(): void {
    from(API_CHECK_LIST)
      .pipe(concatMap(api => this.testEndpoint(api)))
      .subscribe(result => {
        this.resultSubject.next(result);
      });
  }
  async checkAllEndpoints(): Promise<ApiTestResult[]> {
    const results: ApiTestResult[] = [];
    for (const api of API_CHECK_LIST) {
      const result = await this.testEndpoint(api);
      results.push(result);
    }
    return results;
  }

  private async testEndpoint(api: ApiEndpoint): Promise<ApiTestResult> {
    const startTime = Date.now();
    try {
      const response: any = await lastValueFrom(
        this.http.request(api.method, api.endpoint, {
          body: api.body,
          headers: new HttpHeaders({
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/octet-stream',
          }),
        })
      );

      return {
        ...api,
        success: true,
        status: response.status,
        responseTime: Date.now() - startTime,
        error: null,
      };
    } catch (error: any) {
      return {
        ...api,
        success: false,
        status: error.status || 0,
        responseTime: Date.now() - startTime,
        error: error.message,
      };
    }
  }
}

export interface ApiTestResult extends ApiEndpoint {
  success: boolean;
  status: number;
  responseTime: number;
  error: string | null;
}
