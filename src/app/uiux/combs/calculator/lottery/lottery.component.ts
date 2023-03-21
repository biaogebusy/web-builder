import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { ILottery, ILotteryForm } from '@core/interface/combs/ICalculator';
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
  promoteMoney = '0';
  chart: EChartsOption;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.form.controls?.isPromote) {
      this.form.controls.isPromote.setValue(false);
    }
  }

  onFormlyChange(value: ILotteryForm): void {
    console.log(value);
    if (!this.form.valid) {
      return;
    }
    // max: 大额红包 min: 小额红包 promote: 提成
    const { max, min, promote, isPromote } = value;
    if (isPromote) {
      // 固定金额
      if (promote.type === 'fixed') {
        this.promoteMoney = (
          promote.fixed *
          (max.total_number + min.total_number)
        ).toFixed(2);
      }
      // 按比例
      if (promote.type === 'percent') {
        const percent = promote.percent / 100;
        this.promoteMoney = (
          (max.total_money + min.total_money) *
          percent
        ).toFixed(0);
      }
    } else {
      this.promoteMoney = '0';
    }
    this.total = Math.round(
      max.total_money + min.total_money + Number(this.promoteMoney)
    );
    // this.maxTimes = (max.total / max.per).toFixed(0);
    // this.minTimes = (min.total / min.per).toFixed(0);

    const data = {
      dataset: {
        source: [
          ['预算', '费用'],
          ['大额红包总金额', max.total_money],
          ['小额红包总金额', min.total_money],
          ['提成总额', Number(this.promoteMoney)],
        ],
      },
    };

    this.chart = { ...this.content.chart, ...data };
    this.cd.detectChanges();
  }
}
