import {
  AfterViewInit,
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
export class LotteryComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  form = new FormGroup({});
  model: any = {};
  total = 0;
  maxTimes = '0';
  minTimes = '0';
  promoteMoney = '0';
  chart: IChart;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.form.controls?.isPromote) {
      this.form.controls.isPromote.setValue(false);
    }
  }

  onModelChange(value: any): void {
    if (!this.form.valid) {
      return;
    }
    const { max, min, promote, isPromote } = value;
    if (isPromote) {
      this.promoteMoney = (promote.times * promote.money).toFixed(2);
    } else {
      this.promoteMoney = '0';
    }
    this.total = Math.round(max.total + min.total + Number(this.promoteMoney));
    this.maxTimes = (max.total / max.per).toFixed(0);
    this.minTimes = (min.total / min.per).toFixed(0);

    const data = {
      labels: ['大额红包总金额', '小额红包总金额', '提成总额'],
      datasets: [
        {
          data: [max.total, min.total, this.promoteMoney],
        },
      ],
    };

    this.chart = Object.assign({ data }, this.content.chart);
    this.cd.detectChanges();
  }
}
