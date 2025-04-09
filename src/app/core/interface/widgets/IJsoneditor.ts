export interface IJsoneditor {
  type: string;
  data: any;
  classes?: any;
  actions?: any[];
  tooltip?: string;
  isPage?: boolean; // load from page
  isSetting?: boolean; // load from setting page
  path?: string; // load from component or widget
  schemaType: string;
}
