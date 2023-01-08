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
  box: any[];
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
      this.cd.detectChanges();
    }
  }

  onModelChange(value: any): void {
    console.log(value);
    const options = this.formService.handleRangeDate(value.filter);
    this.getContent(options);
  }

  getContent(options = {}): void {
    const params = this.getApiParams(options);
    console.log(params);
    const api = '/api/v3/node/vote/report';
    this.nodeService.search(api, params).subscribe(({ chart, table }) => {
      this.box = [
        {
          data: {
            toggle: [
              {
                label: '饼图',
                icon: {
                  name: 'pie_chart',
                  inline: true,
                },
                value: 'pie',
              },
              {
                label: '柱状图',
                icon: {
                  name: 'equalizer',
                  inline: true,
                },
                value: 'bar',
              },
              {
                label: '折线图',
                icon: {
                  name: 'show_chart',
                  inline: true,
                },
                value: 'line',
              },
            ],
          },
          content: {
            type: 'chart',
            tooltip: {
              trigger: 'axis',
            },
            dataset: [
              {
                source: chart,
              },
              {
                transform: {
                  type: 'sort',
                  config: { dimension: 'total', order: 'asc' },
                },
              },
            ],
            xAxis: {
              type: 'category',
              axisLabel: {
                interval: 0,
                rotate: 30,
              },
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                type: 'bar',
                label: {
                  position: 'top',
                  show: true,
                },
                datasetIndex: 1,
              },
            ],
          },
        },
        {
          content: {
            type: 'dynamic-table',
            header: [
              {
                label: '想要礼品',
                key: 'name',
              },
              {
                label: '想要人数',
                key: 'total',
              },
              {
                label: '占比',
                key: 'percent',
              },
            ],
            elements: table,
          },
        },
      ];
      this.cd.detectChanges();
    });
  }

  clear(): void {
    this.form.reset();
  }
}
