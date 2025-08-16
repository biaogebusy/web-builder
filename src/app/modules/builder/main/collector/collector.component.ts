import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
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
import qs from 'qs';
import { BuilderState } from '@core/state/BuilderState';
import { UtilitiesService } from '@core/service/utilities.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  private user: IUser;
  public form = new UntypedFormGroup({});
  public model: any = {};
  public selection = new SelectionModel<SubmissionItem>(true, []);
  public selectedFields = signal<string[]>([]);
  public nodeFields: FormlyFieldConfig[] = [];
  public selectedModel: any = {};
  public links = signal<IPaginationLinks | undefined>(undefined);
  public fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          key: 'domain',
          type: 'input',
          defaultValue: 'https://builder.design',
          props: {
            label: '域名',
            placeholder: '请输入域名:https://example.com',
            required: true,
          },
          validation: {
            messages: {
              pattern: (error: any, field: FormlyFieldConfig) => '请输入有效的URL',
            },
          },
        },
        {
          key: 'sourceApi',
          type: 'input',
          defaultValue: '/jsonapi/node/blog',
          props: {
            label: '数据来源 API',
            placeholder: '/jsonapi/node/blog',
            required: true,
          },
        },
        {
          key: 'targetApi',
          type: 'input',
          defaultValue: '/jsonapi/node/blog',
          props: {
            label: '数据写入 API',
            placeholder: '/jsonapi/node/blog',
            required: true,
          },
        },
        {
          key: 'sort',
          type: 'select',
          defaultValue: 'changed',
          props: {
            label: '排序字段',
            options: [
              {
                label: '创建时间',
                value: 'created',
              },
              {
                label: '修改时间',
                value: 'changed',
              },
              {
                label: 'Node ID',
                value: 'nid',
              },
            ],
          },
        },
        {
          key: 'sort_direction',
          type: 'select',
          defaultValue: 'DESC',
          props: {
            label: '排序',
            options: [
              {
                label: '降序',
                value: 'DESC',
              },
              {
                label: '升序',
                value: 'ASC',
              },
            ],
          },
        },
        {
          key: 'title',
          type: 'input',
          props: {
            label: '关键词',
          },
        },
        {
          key: 'page',
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
  public selectedForm: any = null;

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
  public isCollecting = signal<boolean>(false);
  public progress = signal<number>(0);
  public errorMessage = signal<string | null>(null);

  public successCount = signal<number>(0);
  private failedItems: SubmissionItem[] = [];

  ngOnInit(): void {
    this.tagService.setTitle('数据采集 - 基于JSONAPI');
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
      this.user = user;
    });
  }

  // 开始采集
  start(): void {
    if (!this.user) {
      this.util.openSnackbar('请登录');
      return;
    }
    const { page, title, sort, sort_direction } = this.model;
    this.resetState();
    this.isCollecting.set(true);

    const apiParams = new DrupalJsonApiParams();
    apiParams.addFilter('status', '1');
    apiParams.addPageLimit(page);
    if (title) {
      apiParams.addFilter('title', title, 'CONTAINS');
    }
    apiParams.addSort(sort, sort_direction);
    const params = apiParams.getQueryObject();
    this.getContent(params);
  }

  async getContent(params: any): Promise<void> {
    const { domain, sourceApi } = this.model;
    try {
      const response = await lastValueFrom(
        this.http.post<any>(`/collector`, {
          ...params,
          domain,
          api: sourceApi,
        })
      );
      const {
        content: { data, links },
      } = response;
      this.handleData(data, links);
      this.getNodeFields(data);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isCollecting.set(false);
    }
  }

  getNodeFields(data: any): void {
    const [first] = data;
    const arr = Object.keys(first.attributes);
    this.nodeFields = [
      {
        fieldGroup: [],
        fieldGroupClassName: 'flex flex-wrap gap-3',
      },
    ];
    arr.forEach(key => {
      if (this.nodeFields.length > 0) {
        if (
          key.startsWith('drupal_') ||
          key.startsWith('revision_') ||
          key.includes('_translation') ||
          key === 'status' ||
          key === 'path'
        ) {
          return;
        }
        this.nodeFields[0].fieldGroup?.push({
          key,
          type: 'checkbox',
          defaultValue: false,
          props: {
            label: key,
          },
        });
      }
    });
    this.selectedForm = new UntypedFormGroup({});
  }

  handleData(data: any, links: IPaginationLinks): void {
    this.links.set(links);
    this.processData(data);
  }

  // 处理采集到的数据
  private async processData(data: any[]): Promise<void> {
    const lists = await Promise.all(
      data.map(async (item, index) => {
        const transformed = await this.dataFetcher.transformExternalToLocal(
          item,
          this.model.domain
        );
        return {
          ...transformed,
          index: index + 1,
        };
      })
    );
    this.previewData = new MatTableDataSource(lists);
    this.isCollecting.set(false);
  }

  // 确认导入
  async confirmImport(selected: SubmissionItem[]): Promise<void> {
    const nodes = this.dataFetcher.processList(this.selectedModel, selected);
    try {
      if (!this.user) {
        this.util.openSnackbar('请登录');
        return;
      }
      this.isCollecting.set(true);
      this.dataFetcher
        .sequentialSubmit(nodes, this.model.targetApi)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: result => this.handleSubmissionResult(result),
          error: err => this.handleSubmissionError(err),
          complete: () => this.handleSubmissionComplete(),
        });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleSubmissionResult(result: {
    success: boolean;
    index: number;
    item?: SubmissionItem;
  }): void {
    const { success, index, item } = result;
    if (item) {
      if (success) {
        this.successCount.update(value => value + 1);
        const successIndex = this.previewData.data.findIndex(
          (target: SubmissionItem) => target.nid === item.nid
        );
        if (index === -1) {
          return;
        }

        const newData = [...this.previewData.data];
        newData[successIndex] = { ...item, status: true };
        this.previewData.data = newData;
      } else {
        this.failedItems.push(item);
      }
    }
  }

  private handleSubmissionError(err: Error): void {
    this.util.openSnackbar(`提交过程中断: ${err.message}`, 'ok');
  }

  private handleSubmissionComplete(): void {
    this.isCollecting.set(false);
    this.selection.clear();
    this.successCount.set(0);
    if (this.failedItems.length > 0) {
      this.util.openSnackbar(`${this.failedItems.length} 条数据提交失败，可尝试重新提交`, 'ok');
      this.failedItems = [];
    }
  }

  viewDetails(item: any): void {
    const { type, title, body } = item;

    let widget = {};
    switch (type) {
      case 'node--json':
        widget = {
          type: 'jsoneditor',
          data: JSON.parse(body),
          classes: 'full-height',
          schemaType: 'none',
        };
        break;
      case 'node--landing_page':
        widget = {
          type: 'jsoneditor',
          data: {
            title,
            body,
          },
          classes: 'full-height',
          schemaType: 'page',
        };
        break;
      default:
        widget = {
          type: 'article',
          title,
          body,
        };
    }
    this.builder.rightContent$.next({
      title: '详情',
      mode: 'over',
      hasBackdrop: true,
      style: {
        width: '800px',
      },
      elements: [
        {
          ...widget,
          fullWidth: true,
        },
      ],
    });
  }

  // 错误处理
  private handleError(error: any): void {
    this.errorMessage.set(error.message || '未知错误');
    setTimeout(() => {
      this.errorMessage.set(null);
    }, 5000);
  }

  private resetState(): void {
    this.progress.set(0);
    this.errorMessage.set(null);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.previewData.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected(): boolean {
    const { filteredData, data } = this.previewData;
    const numSelected = this.selection.selected.length;
    let numRows = 0;
    if (filteredData.length > 0) {
      numRows = filteredData.length;
    } else {
      numRows = data.length;
    }
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    const { filteredData, data } = this.previewData;
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    if (filteredData) {
      this.selection.select(...filteredData);
      return;
    }
    this.selection.select(...data);
  }

  onPageChange(link: string): void {
    this.selection.clear();
    const searchQuery = link.split('?')[1];
    const query = qs.parse(searchQuery);
    this.getContent(query);
  }
}
