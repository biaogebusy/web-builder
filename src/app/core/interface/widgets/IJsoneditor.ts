export interface IJsoneditor {
  type: string;
  data: any;
  classes?: any;
  actions?: any[];
  tooltip?: string;
  isPage?: boolean; // load from page
  isSetting?: boolean; // load from setting page
  isShowcase?: boolean; // load from builder showcase
  path?: string; // load from component or widget
  schemaType: string;
  fullWidth: boolean;
}
