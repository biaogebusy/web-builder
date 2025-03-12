import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CHECK_LIST, ApiEndpoint } from '@modules/builder/main/config-check/api-check-list';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigCheckService {
  private http = inject(HttpClient);
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
          headers: api.headers,
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
