import { Component, OnInit, ChangeDetectorRef, inject, ChangeDetectionStrategy, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '@uiux/base/base.widget';
import { NodeService } from '@core/service/node.service';
import { FormService } from '@core/service/form.service';
import { isArray } from 'lodash-es';
import type { IReport } from '@core/interface/node/IReport';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeaderMetaComponent } from '../header-meta/header-meta.component';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    HeaderMetaComponent,
    FormlyComponent,
    LoadingComponent,
    DynamicComponentComponent,
  ],
})
export class ReportComponent extends BaseComponent implements OnInit {
  readonly content = input<IReport>();
  readonly form = input(new UntypedFormGroup({}));
  readonly model = input<any>({});
  box$: Observable<any[]>;
  loading: boolean;
  private nodeService = inject(NodeService);
  private cd = inject(ChangeDetectorRef);
  private formService = inject(FormService);

  ngOnInit(): void {
    const content = this.content();
    if (content?.params?.api) {
      this.getContent();
    } else {
      this.box$ = of(content.box);
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
    const api = this.content().params.api;
    this.box$ = this.nodeService.fetch(api, params).pipe(
      map(({ chart, table }) => {
        let box = [];
        if (isArray(chart)) {
          box[0] = {
            data: {
              ...this.content().box[0].data,
            },
            content: {
              type: 'chart',
              tooltip: {
                trigger: 'item',
                ...this.content().box[0].content.tooltip,
              },
              legend: {
                ...this.content().box[0].content.legend,
              },
              dataset: [
                {
                  source: chart,
                },
                { ...(this.content().customDataset || {}) },
              ],
              xAxis: {
                type: 'category',
                axisLabel: {
                  interval: 0,
                  rotate: 30,
                },
                ...this.content().box[0].content.xAxis,
              },
              yAxis: {
                type: 'value',
                ...this.content().box[0].content.yAxis,
              },
              series: [...this.content().box[0].content.series],
              ...this.content().box[0].options,
            },
          };
        }
        if (isArray(table)) {
          box[1] = {
            content: {
              type: 'dynamic-table',
              header: [...(this.content().box[1].content.header || [])],
              classes: this.content().box[1].content.classes,
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
    this.form().reset();
  }
}
