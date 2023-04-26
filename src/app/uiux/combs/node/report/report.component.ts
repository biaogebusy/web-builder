import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@uiux/base/base.widget';
import { NodeService } from '@core/service/node.service';
import { FormService } from '@core/service/form.service';
import { isArray } from 'lodash-es';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  @Input() form = new FormGroup({});
  @Input() model: any = {};
  box: any[] = [];
  loading: boolean;
  constructor(
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private formService: FormService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.content?.params?.api) {
      this.getContent();
    } else {
      this.box = this.content.box;
      this.loading = false;
      this.cd.detectChanges();
    }
  }

  onModelChange(value: any): void {
    const options = this.formService.handleRangeDate(value.filter);
    this.getContent(options);
  }

  getContent(options = {}): void {
    this.loading = true;
    const params = this.getApiParams(options);
    const api = this.content.params.api;
    this.nodeService.search(api, params).subscribe(({ chart, table }) => {
      if (isArray(chart)) {
        this.box[0] = {
          data: {
            ...this.content.box[0].data,
          },
          content: {
            type: 'chart',
            tooltip: {
              trigger: 'item',
              ...this.content.box[0].content.tooltip,
            },
            legend: {
              ...this.content.box[0].content.legend,
            },
            dataset: [
              {
                source: chart,
              },
              { ...(this.content.customDataset || {}) },
            ],
            xAxis: {
              type: 'category',
              axisLabel: {
                interval: 0,
                rotate: 30,
              },
              ...this.content.box[0].content.xAxis,
            },
            yAxis: {
              type: 'value',
              ...this.content.box[0].content.yAxis,
            },
            series: [...this.content.box[0].content.series],
            ...this.content.box[0].options,
          },
        };
      }
      if (isArray(table)) {
        this.box[1] = {
          content: {
            type: 'dynamic-table',
            header: [...this.content.box[1].content.header],
            classes: this.content.box[1].content.classes,
            elements: table,
          },
        };
      }

      if (!isArray(chart) && !isArray(table)) {
        this.box = [
          {
            content: {
              type: 'text',
              body: '无数据',
            },
          },
        ];
      }
      this.loading = false;
      this.cd.detectChanges();
    });
  }

  clear(): void {
    this.form.reset();
  }
}
