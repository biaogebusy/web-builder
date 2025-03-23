import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DataFetcherService } from '@core/service/data-fetcher.service';
import { Observable, lastValueFrom, map, timer } from 'rxjs';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { NodeService } from '@core/service/node.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.scss',
  standalone: false,
})
export class CollectorComponent {
  private http = inject(HttpClient);
  public form = new UntypedFormGroup({});
  public model: any = {};
  public fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'grid grid-cols-12 gap-3',
      fieldGroup: [
        {
          key: 'domain',
          className: 'col-span-12 sm:col-span-4',
          type: 'input',
          defaultValue: 'https://builder.design',
          props: {
            label: '域名',
            placeholder: '请输入域名:https://example.com',
            required: true,
          },
        },
        {
          key: 'api',
          className: 'col-span-12 sm:col-span-3',
          type: 'input',
          defaultValue: '/api/v1/node/article',
          props: {
            label: 'API',
            placeholder: '/jsonapi/node/article',
            required: true,
          },
        },
        {
          key: 'title',
          className: 'col-span-12 sm:col-span-3',
          type: 'input',
          props: {
            label: '标题',
          },
        },
        {
          key: 'page',
          className: 'col-span-12 sm:col-span-2',
          type: 'select',
          defaultValue: 20,
          props: {
            label: '分页',
            options: [
              {
                label: '10',
                value: 10,
              },
              {
                label: '20',
                value: 20,
              },
              {
                label: '30',
                value: 30,
              },
              {
                label: '40',
                value: 40,
              },
              {
                label: '50',
                value: 50,
              },
            ],
          },
        },
      ],
    },
  ];
  private dataFetcher = inject(DataFetcherService);

  // 表格配置
  displayedColumns: string[] = ['title', 'summary', 'actions'];
  previewData: any[] = [];

  // 状态管理
  isCollecting = false;
  progress = 0;
  completedCount = 0;
  errorMessage: string | null = null;
  errorDetails: any = null;

  // 性能估算
  get estimatedRemaining(): Observable<number> {
    return timer(0, 1000).pipe(
      map(() => Math.round((this.previewData.length - this.completedCount) * 0.5))
    );
  }

  get validCount(): number {
    return this.previewData.filter(item => item._status === 'valid').length;
  }

  // 开始采集
  async start(value: any): Promise<void> {
    const { domain, api, page, title } = value;
    try {
      this.resetState();
      this.isCollecting = true;

      const apiParams = new DrupalJsonApiParams();
      apiParams.addFilter('status', '1');
      apiParams.addPageLimit(page);
      if (title) {
        apiParams.addFilter('title', title, 'CONTAINS');
      }

      const params = apiParams.getQueryObject();

      const response = await lastValueFrom(
        this.http.post<any>(`/collector`, {
          ...params,
          domain,
          api,
        })
      );
      this.processData(response.content.data);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isCollecting = false;
    }
  }

  // 处理采集到的数据
  private processData(data: any[]): void {
    this.previewData = data.map(item => {
      const transformed = this.dataFetcher.transformExternalToLocal(item);
      return transformed;
    });

    this.progress = 100;
  }

  // 确认导入
  async confirmImport(): Promise<void> {
    try {
      this.isCollecting = true;
      await this.dataFetcher.batchCreate(this.previewData).toPromise();

      this.clearPreview();
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isCollecting = false;
    }
  }

  // 清空预览
  clearPreview(): void {
    this.previewData = [];
    localStorage.removeItem('cachedCollection');
  }

  // 查看详情
  viewDetails(item: any): void {
    // 实现详情查看逻辑
    console.log('Item details:', item);
  }

  // 错误处理
  private handleError(error: any): void {
    this.errorMessage = error.message || '未知错误';
    this.errorDetails = error.error || null;
    setTimeout(() => {
      this.errorMessage = null;
      this.errorDetails = null;
    }, 5000);
  }

  private resetState(): void {
    this.progress = 0;
    this.completedCount = 0;
    this.errorMessage = null;
    this.errorDetails = null;
  }
}
