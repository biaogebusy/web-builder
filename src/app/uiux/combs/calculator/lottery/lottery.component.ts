import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
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
  @Input() form = new UntypedFormGroup({});
  @Input() model: any = {};
  total = 0;
  promoteMoney = '0';
  minTotalMoney = 0;
  chart: EChartsOption;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.form.controls?.isPromote) {
      this.form.controls.isPromote.setValue(false);
    }
  }

  onFormlyChange(value: ILotteryForm): void {
    if (!this.form.valid) {
      return;
    }
    // max: 大额红包 min: 小额红包 promote: 提成
    const { max, min, promote, isPromote } = value;
    const {
      per_max: min_per_max,
      per_min: min_per_min,
      total_number: min_total_number,
    } = min;
    this.minTotalMoney = Number(
      (((min_per_max + min_per_min) / 2) * min_total_number).toFixed(2)
    );
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
          (max.total_money + this.minTotalMoney) *
          percent
        ).toFixed(0);
      }
    } else {
      this.promoteMoney = '0';
    }
    this.total = Math.round(
      max.total_money + this.minTotalMoney + Number(this.promoteMoney)
    );

    const data = {
      dataset: {
        source: [
          ['预算', '费用'],
          ['大额红包总金额', max.total_money],
          ['小额红包总金额', this.minTotalMoney],
          ['提成总额', Number(this.promoteMoney)],
        ],
      },
    };

    this.chart = { ...this.content.chart, ...data };
    this.cd.detectChanges();
  }
}
