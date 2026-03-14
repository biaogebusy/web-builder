import { FormlyFieldConfig } from '@ngx-formly/core';
import { IBtn } from '../widgets/IBtn';

export interface IDynamicForm {
  classes: any;
  dynamicClasses: any;
  dynamicComponent: any;
  formClasses: any;
  form: {
    type: 'formly';
    id: string;
    fields: FormlyFieldConfig[];
  };
  action: {
    classes: any;
    submit: IBtn;
  };
}
