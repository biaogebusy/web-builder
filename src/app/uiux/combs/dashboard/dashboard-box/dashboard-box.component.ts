import {
  Component,
  computed,
  inject,
  signal,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import type { IDashboardBox } from '@core/interface/combs/IDashboard';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { defaultsDeep, random } from 'lodash-es';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard-box',
  templateUrl: './dashboard-box.component.html',
  styleUrls: ['./dashboard-box.component.scss'],
  imports: [
    ReactiveFormsModule,
    ContenteditDirective,
    IconComponent,
    LoadingComponent,
    DynamicComponentComponent,
    FormlyComponent,
  ],
})
export class DashboardBoxComponent extends BaseComponent {
  readonly content = input.required<IDashboardBox>();
  readonly form = input(new UntypedFormGroup({}));
  readonly model = input<any>({});

  formService = inject(FormService);
  nodeService = inject(NodeService);

  private queryOptions = signal<any>({});

  private widgetRes = this.nodeService.fetchResource(() => {
    const api = this.content()?.params?.api;
    if (!api) {
      return undefined;
    }
    return { api, params: this.getApiParams(this.queryOptions()) };
  });

  loading = computed(() => !!this.content()?.params?.api && this.widgetRes.isLoading());

  widget = computed(() => {
    const content = this.content();
    if (!content?.params?.api) {
      return content.widget;
    }
    const type = content.widget.type;
    const res = this.widgetRes.error() ? this.getFallbackData(type) : this.widgetRes.value();
    if (!res) {
      return undefined;
    }
    const { chart, rows } = res;
    switch (type) {
      case 'chart':
        return defaultsDeep(
          {
            dataset: [
              {
                source: chart,
              },
            ],
          },
          content.widget
        );
      case 'dynamic-table':
        return defaultsDeep(
          {
            elements: rows,
          },
          content.widget
        );
      default:
        return undefined;
    }
  });

  constructor() {
    super();
  }

  onModelChange(value: any): void {
    this.queryOptions.set(this.formService.handleRangeDate(value));
  }

  reload(): void {
    this.form().reset();
    this.queryOptions.set({ time: +new Date() });
  }

  private getFallbackData(type: string): any {
    switch (type) {
      case 'chart':
        return {
          chart: [
            ['name', '用户'],
            ['1月', random(1, 100)],
            ['2月', random(1, 100)],
            ['3月', random(1, 100)],
            ['4月', random(1, 100)],
            ['5月', random(1, 100)],
            ['6月', random(1, 100)],
            ['7月', random(1, 100)],
            ['8月', random(1, 100)],
            ['9月', random(1, 100)],
            ['10月', random(1, 100)],
            ['11月', random(1, 100)],
            ['12月', random(1, 100)],
          ],
        };
      case 'dynamic-table':
        return {
          rows: [
            {
              title: '<a href="#">质保金案件</a>',
              custom: '新能源公司',
              hander: '张三',
              type: '一审立案完成',
              date: '2023/03/29',
            },
            {
              title: '<a href="#">赠与合同纠纷</a>',
              custom: '云城租赁',
              hander: '李四',
              type: '二审立案完成',
              date: '2022/09/26',
            },
            {
              title: '<a href="#">仲裁案</a>',
              custom: '建工集团',
              hander: '王五',
              type: '一审开庭确认',
              date: '2023/03/12',
            },
            {
              title: '<a href="#">执行异议</a>',
              custom: '劳务租赁',
              hander: '张三',
              type: '一审立案准备',
              date: '2023/02/21',
            },
            {
              title: '<a href="#">工程施工合同</a>',
              custom: '工程集团',
              hander: '张三',
              type: '一审判决完成',
              date: '2023/02/17',
            },
          ],
        };
      default:
        return {};
    }
  }
}
