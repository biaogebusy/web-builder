import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DataFetcherService } from '@core/service/data-fetcher.service';
import { Observable, lastValueFrom } from 'rxjs';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TagsService } from '@core/service/tags.service';
import { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { SubmissionItem } from '@core/interface/node/IDrupal';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';
import { NodeService } from '@core/service/node.service';
import qs from 'qs';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.scss',
  standalone: false,
})
export class CollectorComponent implements OnInit {
  private http = inject(HttpClient);
  private user$ = inject<Observable<IUser>>(USER);
  private builder = inject(BuilderState);
  private user: IUser;
  public form = new UntypedFormGroup({});
  public model: any = {};
  public selection = new SelectionModel<SubmissionItem>(true, []);
  links = signal<IPaginationLinks | undefined>(undefined);
  public fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex flex-col gap-3',
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
            label: '关键词',
          },
        },
        {
          key: 'page',
          className: 'col-span-12 sm:col-span-2',
          type: 'select',
          defaultValue: 20,
          props: {
            label: '每页显示',
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
  private nodeService = inject(NodeService);

  // 表格配置
  public displayedColumns: string[] = [
    'select',
    'index',
    'nid',
    'title',
    'created',
    'langcode',
    'status',
  ];
  public previewData: any;

  // 状态管理
  public isCollecting = false;
  public progress = 0;
  public errorMessage: string | null = null;
  public errorDetails: any = null;

  private error: string | null = null;
  private totalToSubmit = 0;
  private successCount = 0;
  private failedItems: SubmissionItem[] = [];

  ngOnInit(): void {
    this.tagService.setTitle('数据采集 - 基于JSONAPI');
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  // 开始采集
  start(): void {
    // if (!this.user) {
    //   this.util.openSnackbar('请登录');
    //   return;
    // }
    const { page, title } = this.model;
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

      this.getContent(params);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isCollecting = false;
    }
  }

  async getContent(params: any): Promise<void> {
    const { domain, api } = this.model;
    const response = await lastValueFrom(
      this.http.post<any>(`/collector`, {
        ...params,
        domain,
        api,
      })
    );
    const {
      content: { data, links },
    } = response;
    this.handleData(data, links);
  }

  handleData(data: any, links: IPaginationLinks): void {
    this.links.set(links);
    this.processData(data);
  }

  // 处理采集到的数据
  private processData(data: any[]): void {
    this.previewData = new MatTableDataSource(
      data.map((item, index) => {
        const transformed = this.dataFetcher.transformExternalToLocal(item, this.model.api);
        return {
          ...transformed,
          index: index + 1,
        };
      })
    );

    this.progress = 100;
  }

  // 确认导入
  async confirmImport(selected: SubmissionItem[]): Promise<void> {
    try {
      // if (!this.user) {
      //   this.util.openSnackbar('请登录');
      //   return;
      // }
      this.isCollecting = true;
      this.dataFetcher.sequentialSubmit(selected).subscribe({
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
    if (result.success) {
      this.successCount++;
    } else if (result.item) {
      this.failedItems.push(result.item);
    }
  }

  private handleSubmissionError(err: Error): void {
    this.error = `提交过程中断: ${err.message}`;
  }

  private handleSubmissionComplete(): void {
    if (this.failedItems.length > 0) {
      this.error = `${this.failedItems.length} 条数据提交失败，可尝试重新提交`;
    }
  }

  viewDetails(item: any): void {
    this.builder.rightContent$.next({
      mode: 'over',
      hasBackdrop: true,
      style: {
        width: '800px',
      },
      elements: [
        {
          type: 'article',
          title: item.title,
          body: item.body,
        },
      ],
    });
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
    this.errorMessage = null;
    this.errorDetails = null;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.previewData.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.previewData.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.previewData.data);
  }

  onPageChange(link: string): void {
    this.selection.clear();
    const searchQuery = link.split('?')[1];
    const query = qs.parse(searchQuery);
    this.getContent(query);
  }
}
