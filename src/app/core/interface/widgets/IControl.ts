import { MatFormFieldAppearance } from '@angular/material/form-field';
import { TooltipPosition } from '@angular/material/tooltip';

export interface IControl {
  type: string;
  key: string;
  label: string;
  value?: any;
  params?: any;
  icon?: string;
  multiple?: boolean;
  placeholder?: string;
  order?: number;
  controlType?: string;
  options?: { value: string; label: string }[];
  errorMes?: string;
  appearance?: MatFormFieldAppearance;
  tooltip?: string;
  suffix?: string;
  matTooltipPosition?: TooltipPosition;
  clear?: boolean;
  rows?: number;
  mode?: string;
  api?: string;
  search?: boolean;
  noFound?: string;
  none?: {
    label: string;
  };
}
