import { FormlyFieldConfig } from '@ngx-formly/core';
import { IBgImg } from '../widgets/IBgImg';
import { IText } from '../widgets/IText';
import { IBtn } from '../widgets/IBtn';
import { ICombsBase } from './ICombsBase';

export interface IContactUs1v1 extends ICombsBase {
  text: IText;
  classes: string;
  bg: IBgImg;
  form: FormlyFieldConfig[];
  action: IBtn;
  content: any[];
  contentStyle: any;
}
