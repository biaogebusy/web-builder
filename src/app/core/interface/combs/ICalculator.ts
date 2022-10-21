import { FormlyFieldConfig } from '@ngx-formly/core';
import { ICombsBase } from './ICombsBase';
export interface ILottery extends ICombsBase {
  form: FormlyFieldConfig[];
  description: string;
}
