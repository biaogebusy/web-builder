import { FormlyFieldConfig } from '@ngx-formly/core';
import { IBtn } from '../widgets/IBtn';

export interface IDynamicForm {
  /** Styling hooks; all optional because the template binds them with `[class]` */
  classes?: any;
  dynamicClasses?: any;
  /** Optional side content; generated forms have none, so the block is skipped */
  dynamicComponent?: any;
  formClasses?: any;
  form: {
    type: 'formly';
    id: string;
    fields: FormlyFieldConfig[];
  };
  action: {
    classes?: any;
    submit: IBtn;
  };
}
