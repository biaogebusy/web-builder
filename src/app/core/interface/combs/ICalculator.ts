import { FormlyFieldConfig } from '@ngx-formly/core';
import { ICombsBase } from './ICombsBase';
import { EChartsOption } from 'echarts';
export interface ILottery extends ICombsBase {
  form: FormlyFieldConfig[];
  description: string;
  chart: EChartsOption;
  data?: any;
}
