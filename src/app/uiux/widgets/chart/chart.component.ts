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
  // https://xieziyu.github.io/ngx-echarts/
  @Input() content: EChartsOption;
  theme: any;
  @Input() data: any;
  @Input() style: any;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.theme = Object.assign(
      {
        color: ['#2E9BFF', '#987BE9', '#FAA16F', '#9DD094', '#FF6461'],
      },
      this.data?.theme
    );
  }

  onChange(chart: any): void {
    if (isArray(this.content.series)) {
      this.content.series.forEach(item => {
        item.type = chart.value;
      });
      this.content = { ...this.content };
      this.cd.detectChanges();
    }
  }
}
