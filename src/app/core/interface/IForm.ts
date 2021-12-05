import { MatFormFieldAppearance } from '@angular/material/form-field';

export interface IControl {
  type: string;
  key: string;
  label: string;
  value: any;
  params?: any;
  icon?: string;
  multiple?: boolean;
  placeholder?: string;
  order?: number;
  controlType?: string;
  options?: { key: string; value: string; label?: string }[];
  errorMes?: string;
  appearance?: MatFormFieldAppearance;
}

export interface IAction {
  label: string;
  type?: string;
  color: string;
  params: IActionParams;
}

export interface IActionParams {
  type: string;
  snackMes?: string;
}
