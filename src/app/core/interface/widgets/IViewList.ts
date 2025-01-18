import { FormlyFieldConfig } from '@ngx-formly/core';
import { IText } from './IText';
import { IBgImg } from './IBgImg';

export interface IViewList {
  type: string;
  spacer?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  params: Params;
  header: Header[];
  form: {
    type: string;
    fields: FormlyFieldConfig[];
  };
  tableClasses?: string;
  tableParams?: any;
  fullWidth?: boolean;
  id?: string;
  bg?: IBgImg;
  text?: IText;
  data?: any;
}

export interface Params {
  apiType: string;
  export?: any;
  emptyHidden?: boolean;
  reqRoles?: string[];
}

export interface Header {
  label: string;
  key: string;
  style?: Style;
  dialog?: Dialog;
}

export interface Style {
  [key: string]: string;
}

export interface Dialog {
  shorten: number;
  label: string;
}
