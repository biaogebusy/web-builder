import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { ILottery } from '@core/interface/combs/ICalculator';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LotteryComponent implements OnInit, AfterViewInit {
  @Input() content: ILottery;
  @Input() form = new FormGroup({});
  @Input() model: any = {};
  total = 0;
  maxTimes = '0';
  minTimes = '0';
  promoteMoney = '0';
  chart: EChartsOption;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.form.controls?.isPromote) {
      this.form.controls.isPromote.setValue(false);
    }
  }

  onFormlyChange(value: any): void {
    if (!this.form.valid) {
      return;
    }
    // max: 大额红包 min: 小额红包 promote: 提成
    const { max, min, promote, isPromote } = value;
    if (isPromote) {
      // 固定金额
      if (promote.type === 'fixed') {
        this.promoteMoney = (promote.fixedTimes * promote.fixedMoney).toFixed(
          2
        );
      }
      // 按比例
      if (promote.type === 'prop') {
        const prop = promote.prop / 100;
        const maxMoney = promote.maxTimes * prop * max.per;
        const minMoney = promote.minTimes * prop * min.per;
        this.promoteMoney = (maxMoney + minMoney).toFixed(0);
      }
    } else {
      this.promoteMoney = '0';
    }
    this.total = Math.round(max.total + min.total + Number(this.promoteMoney));
    this.maxTimes = (max.total / max.per).toFixed(0);
    this.minTimes = (min.total / min.per).toFixed(0);

    const data = {
      dataset: {
        source: [
          ['预算', '费用'],
          ['大额红包总金额', max.total],
          ['小额红包总金额', min.total],
          ['提成总额', Number(this.promoteMoney)],
        ],
      },
    };

    this.chart = { ...this.content.chart, ...data };
    this.cd.detectChanges();
  }
}
