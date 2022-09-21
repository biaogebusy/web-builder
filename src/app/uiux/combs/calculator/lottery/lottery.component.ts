import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';

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
  chart: EChartsOption;

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

    const data = [
      {
        value: max.total,
        name: '大额红包总金额',
      },
      {
        value: min.total,
        name: '小额红包总金额',
      },
      {
        value: this.promoteMoney,
        name: '提成总额',
      },
    ];
    const updateOptions = {
      series: [
        {
          data,
          name: '预算占比',
          type: 'pie',
          radius: '50%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    this.chart = { ...this.content.chart, ...updateOptions };
    this.cd.detectChanges();
  }
}
