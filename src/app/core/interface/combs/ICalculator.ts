import { FormlyFieldConfig } from '@ngx-formly/core';
import { EChartsOption } from 'echarts';
import { ICombsBase } from './ICombsBase';
export interface ILottery extends ICombsBase {
  form: FormlyFieldConfig[];
  description: string;
  chart: EChartsOption;
}
