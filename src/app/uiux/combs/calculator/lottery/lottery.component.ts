import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import type { ILottery, ILotteryForm } from '@core/interface/combs/ICalculator';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { ChartComponent } from '@uiux/combs/chart/chart/chart.component';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SafeHtmlPipe, TextComponent, FormlyComponent, ChartComponent],
})
export class LotteryComponent implements AfterViewInit {
  private cd = inject(ChangeDetectorRef);

  readonly content = input<ILottery>();
  readonly form = input(new UntypedFormGroup({}));
  readonly model = input<any>({});
  total = 0;
  promoteMoney = '0';
  minTotalMoney = 0;
  chart: EChartsOption;


  ngAfterViewInit(): void {
    const form = this.form();
    if (form.controls?.isPromote) {
      form.controls.isPromote.setValue(false);
    }
  }

  onFormlyChange(value: ILotteryForm): void {
    if (!this.form().valid) {
      return;
    }
    // max: 大额红包 min: 小额红包 promote: 提成
    const { max, min, promote, isPromote } = value;
    const { per_max: min_per_max, per_min: min_per_min, total_number: min_total_number } = min;
    this.minTotalMoney = Number((((min_per_max + min_per_min) / 2) * min_total_number).toFixed(2));
    if (isPromote) {
      // 固定金额
      if (promote.type === 'fixed') {
        this.promoteMoney = (promote.fixed * (max.total_number + min.total_number)).toFixed(2);
      }
      // 按比例
      if (promote.type === 'percent') {
        const percent = promote.percent / 100;
        this.promoteMoney = ((max.total_money + this.minTotalMoney) * percent).toFixed(0);
      }
    } else {
      this.promoteMoney = '0';
    }
    this.total = Math.round(max.total_money + this.minTotalMoney + Number(this.promoteMoney));

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

    this.chart = { ...this.content().chart, ...data };
    this.cd.detectChanges();
  }
}
