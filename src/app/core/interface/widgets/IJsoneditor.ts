import type { CssClassValue, JsonValue } from '../common';

export interface IJsoneditor {
  type: string;
  data: JsonValue | object;
  classes?: CssClassValue;
  actions?: IJsoneditorAction[];
  tooltip?: string;
  isPage?: boolean; // load from page
  isSetting?: boolean; // load from setting page
  isShowcase?: boolean; // load from builder showcase
  path?: string; // load from component or widget
  schemaType: string;
  fullWidth: boolean;
}

export interface IJsoneditorAction {
  type: string;
  label: string;
  color?: string;
  params?: object;
}
