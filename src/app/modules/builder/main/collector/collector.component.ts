import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DataFetcherService } from '@core/service/data-fetcher.service';
import { Observable, lastValueFrom, map, timer } from 'rxjs';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TagsService } from '@core/service/tags.service';
import { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { UtilitiesService } from '@core/service/utilities.service';
import { SubmissionItem } from '@core/interface/node/IDrupal';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.scss',
  standalone: false,
})
export class CollectorComponent implements OnInit {
  private http = inject(HttpClient);
  private user$ = inject<Observable<IUser>>(USER);
  private util = inject(UtilitiesService);
  private user: IUser;
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
          defaultValue: '/api/v1/node/blog',
          props: {
            label: 'API',
            placeholder: '/jsonapi/node/blog',
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
  private tagService = inject(TagsService);

  // 表格配置
  public displayedColumns: string[] = ['status', 'title', 'summary', 'actions'];
  public previewData: SubmissionItem[] = [];

  // 状态管理
  public isCollecting = false;
  public progress = 0;
  public completedCount = 0;
  public errorMessage: string | null = null;
  public errorDetails: any = null;

  error: string | null = null;
  isSubmitting = false;
  currentProgress = 0;
  totalToSubmit = 0;
  successCount = 0;
  failedItems: SubmissionItem[] = [];

  ngOnInit(): void {
    this.tagService.setTitle('数据采集 - 基于JSONAPI');
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  // 性能估算
  get estimatedRemaining(): Observable<number> {
    return timer(0, 1000).pipe(
      map(() => Math.round((this.previewData.length - this.completedCount) * 0.5))
    );
  }

  // 开始采集
  async start(value: any): Promise<void> {
    // if (!this.user) {
    //   this.util.openSnackbar('请登录');
    //   return;
    // }
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
      this.processData(response.content.data, api);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isCollecting = false;
    }
  }

  // 处理采集到的数据
  private processData(data: any[], api: string): void {
    this.previewData = data.map(item => {
      const transformed = this.dataFetcher.transformExternalToLocal(item, api);
      return transformed;
    });

    this.progress = 100;
  }

  // 确认导入
  async confirmImport(): Promise<void> {
    try {
      // if (!this.user) {
      //   this.util.openSnackbar('请登录');
      //   return;
      // }
      this.isCollecting = true;
      this.dataFetcher.sequentialSubmit(this.previewData).subscribe({
        next: result => this.handleSubmissionResult(result),
        error: err => this.handleSubmissionError(err),
        complete: () => this.handleSubmissionComplete(),
      });
      // this.clearPreview();
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isCollecting = false;
    }
  }

  private handleSubmissionResult(result: {
    success: boolean;
    index: number;
    item?: SubmissionItem;
  }): void {
    this.currentProgress = Math.round((result.index / this.totalToSubmit) * 100);

    if (result.success) {
      this.successCount++;
    } else if (result.item) {
      this.failedItems.push(result.item);
    }
  }

  private handleSubmissionError(err: Error): void {
    this.isSubmitting = false;
    this.error = `提交过程中断: ${err.message}`;
  }

  private handleSubmissionComplete(): void {
    this.isSubmitting = false;
    if (this.failedItems.length > 0) {
      this.error = `${this.failedItems.length} 条数据提交失败，可尝试重新提交`;
    }
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
