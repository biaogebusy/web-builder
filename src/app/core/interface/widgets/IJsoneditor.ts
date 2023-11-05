export interface IJsoneditor {
  type: string;
  data: any;
  isPreview: boolean;
  index: number;
  uuid: string;
  actions?: any[];
  actionsAlign?: string;
  isPage?: boolean;
  tooltip?: string;
}
