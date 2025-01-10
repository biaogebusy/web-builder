import { Component, Input, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BaseComponent } from '@uiux/base/base.widget';
import { NodeService } from '@core/service/node.service';
import { FormService } from '@core/service/form.service';
import { isArray } from 'lodash-es';
import type { IReport } from '@core/interface/node/IReport';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent extends BaseComponent implements OnInit {
  @Input() content: IReport;
  @Input() form = new UntypedFormGroup({});
  @Input() model: any = {};
  box$: Observable<any[]>;
  loading: boolean;
  private nodeService = inject(NodeService);
  private cd = inject(ChangeDetectorRef);
  private formService = inject(FormService);

  ngOnInit(): void {
    if (this.content?.params?.api) {
      this.getContent();
    } else {
      this.box$ = of(this.content.box);
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
    this.box$ = this.nodeService.fetch(api, params).pipe(
      map(({ chart, table }) => {
        let box = [];
        if (isArray(chart)) {
          box[0] = {
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
          box[1] = {
            content: {
              type: 'dynamic-table',
              header: [...(this.content.box[1].content.header || [])],
              classes: this.content.box[1].content.classes,
              elements: table,
            },
          };
        }

        if (!isArray(chart) && !isArray(table)) {
          box = [
            {
              content: {
                type: 'text',
                body: '无数据',
              },
            },
          ];
        }
        this.loading = false;
        return box;
      })
    );
  }

  clear(): void {
    this.form.reset();
  }
}
