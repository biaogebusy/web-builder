import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import type { IDashboardBox } from '@core/interface/combs/IDashboard';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { defaultsDeep, random } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard-box',
    templateUrl: './dashboard-box.component.html',
    styleUrls: ['./dashboard-box.component.scss'],
    standalone: false
})
export class DashboardBoxComponent extends BaseComponent implements OnInit {
  @Input() content: IDashboardBox;
  @Input() form = new UntypedFormGroup({});
  @Input() model: any = {};
  widget$: Observable<any>;
  loading = signal(true);

  formService = inject(FormService);
  nodeService = inject(NodeService);
  destroyRef = inject(DestroyRef);
  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.content?.params?.api) {
      this.getContent();
    } else {
      this.widget$ = of(this.content.widget);
      this.loading.set(false);
    }
  }

  onModelChange(value: any): void {
    const options = this.formService.handleRangeDate(value);
    this.getContent(options);
  }

  getContent(options = {}): void {
    const api = this.content.params?.api || '';
    const params = this.getApiParams(options);
    const type = this.content.widget.type;
    this.loading.set(true);
    this.widget$ = this.nodeService.fetch(api, params).pipe(
      catchError(() => {
        let data: any[] = [];
        switch (type) {
          case 'chart':
            data = [
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
            ];
            break;

          case 'dynamic-table':
            data = [
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
            ];
            break;
        }
        return of(data);
      }),
      delay(500),
      map(({ chart, rows }) => {
        let data: any = {};
        switch (type) {
          case 'chart':
            data = defaultsDeep(
              {
                dataset: [
                  {
                    source: chart,
                  },
                ],
              },
              this.content.widget
            );
            break;
          case 'dynamic-table':
            data = defaultsDeep(
              {
                elements: rows,
              },
              this.content.widget
            );
            break;
        }
        this.loading.set(false);
        return data;
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  reload(): void {
    this.form.reset();
    this.getContent({ time: +new Date() });
  }
}
