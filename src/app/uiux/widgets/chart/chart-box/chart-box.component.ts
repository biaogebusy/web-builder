import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart-box',
  templateUrl: './chart-box.component.html',
  styleUrls: ['./chart-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartBoxComponent implements OnInit {
  @Input() content: any;
  @Input() style = {
    minHeight: '50px',
    width: '100%',
  };
  chart: EChartsOption;
  constructor() {}

  ngOnInit(): void {
    if (this.content?.params?.api) {
      // get chart data
    } else {
      this.chart = this.content.chart;
    }
  }
}
