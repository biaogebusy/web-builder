import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { IDashboardBox } from '@core/interface/combs/IDashboard';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { defaultsDeep, random } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-box',
  templateUrl: './dashboard-box.component.html',
  styleUrls: ['./dashboard-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardBoxComponent extends BaseComponent implements OnInit {
  @Input() content: IDashboardBox;
  @Input() form = new FormGroup({});
  @Input() model: any = {};
  widget$: Observable<any>;
  constructor(
    private formService: FormService,
    private nodeService: NodeService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.content?.params?.api) {
      this.getContent();
    } else {
      this.widget$ = of(this.content.widget);
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
    this.widget$ = this.nodeService.search(api, params).pipe(
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
      map((res) => {
        let data: any = {};
        switch (type) {
          case 'chart':
            data = defaultsDeep(
              {
                dataset: [
                  {
                    source: res,
                  },
                ],
              },
              this.content.widget
            );
            break;
          case 'dynamic-table':
            data = defaultsDeep(
              {
                elements: res,
              },
              this.content.widget
            );
            break;
        }
        return data;
      })
    );
  }
}
