import { FormlyFieldConfig } from '@ngx-formly/core';
import { IBg } from './IBg';
import { IText } from './IText';

export interface IViewList {
  type: string;
  spacer?: string;
  params: Params;
  header: Header[];
  form: FormlyFieldConfig[];
  tableClasses?: string;
  tableParams?: any;
  fullWidth?: boolean;
  id?: string;
  bg?: IBg;
  text?: IText;
}

export interface Params {
  apiType: string;
  export?: any;
  emptyHidden: boolean;
  reqRoles: string[];
}

export interface Header {
  label: string;
  key: string;
  style?: Style;
  dialog?: Dialog;
}

export interface Style {
  color: string;
}

export interface Dialog {
  shorten: number;
  label: string;
}
