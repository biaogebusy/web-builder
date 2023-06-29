import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { EChartsOption } from 'echarts';
import { isArray } from 'lodash-es';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  @Input() content: EChartsOption;
  @Input() data: any;
  @Input() style: any;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onChange(chart: any): void {
    if (isArray(this.content.series)) {
      this.content.series.forEach((item) => {
        item.type = chart.value;
      });
      this.content = { ...this.content };
      this.cd.detectChanges();
    }
  }
}
