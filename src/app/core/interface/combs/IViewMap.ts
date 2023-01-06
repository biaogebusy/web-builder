import { FormlyFieldConfig } from '@ngx-formly/core';

export interface IViewMap {
  params: {
    api?: string;
    city?: string;
    drawer?: boolean;
  };
  form: FormlyFieldConfig[];
  elements?: IViewMapItem[];
}

export interface IViewMapItem {
  img?: string;
  title: string;
  subTitle: string;
  badge_1?: string;
  badge_2?: string;
  meta_1?: string;
  meta_2?: string;
  address?: string;
  position?: string;
}
