import { FormlyFieldConfig } from '@ngx-formly/core';
import { ICombsBase } from './ICombsBase';
import { EChartsOption } from 'echarts';
export interface ILottery extends ICombsBase {
  form: FormlyFieldConfig[];
  description: string;
  chart: EChartsOption;
  data?: any;
}

export interface ILotteryForm {
  max: {
    total_money: number;
    total_number: number;
  };
  min: {
    total_money: number;
    total_number: number;
    per_max: number;
  };
  promote: {
    type: 'fixed' | 'percent';
    fixed: number;
    percent: number;
  };
  isPromote: boolean;
}
