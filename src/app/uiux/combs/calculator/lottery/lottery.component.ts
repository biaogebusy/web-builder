import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IChart } from '@core/interface/widgets/IChart';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LotteryComponent implements OnInit {
  @Input() content: any;
  form = new FormGroup({});
  model: any = {};
  total = 0;
  maxPer = '0';
  minPer = '0';
  chart: IChart;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
  onModelChange(value: any): void {
    console.log(value);
    this.total = Math.round(value.max + value.min);
    this.maxPer = (value.max / value.maxTotal).toFixed(2);
    this.minPer = (value.min / value.minTotal).toFixed(2);

    const data = {
      labels: ['大红包总金额', '小红包总金额'],
      datasets: [
        {
          data: [value.max, value.min],
        },
      ],
    };

    this.chart = Object.assign({ data }, this.content.chart);
    // debugger;
    this.cd.detectChanges();
    // this.cd.markForCheck();
  }
}
