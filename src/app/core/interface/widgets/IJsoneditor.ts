export interface IJsoneditor {
  type: string;
  data: any;
  actions?: any[];
  actionsAlign?: string;
  tooltip?: string;
  isPage?: boolean; // load from page
  isSetting?: boolean; // load from setting page
  path?: string; // load from component or widget
}
