import { FormlyFieldConfig } from '@ngx-formly/core';
import { ITitle } from '../widgets/ITitle';
import { IBtn } from '../widgets/IBtn';

export interface IManageMedia {
  row: number;
  sidebar: {
    title: ITitle;
    form: FormlyFieldConfig[];
    action: IBtn;
  };
}
