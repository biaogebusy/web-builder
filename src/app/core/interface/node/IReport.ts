import { FormlyFieldConfig } from '@ngx-formly/core';

export interface IReport {
  type: string;
  style?: any;
  header?: any;
  form: FormlyFieldConfig[];
  row?: number;
  params?: any;
  box: any[];
  customDataset?: any;
  datasetIndex?: number;
}
