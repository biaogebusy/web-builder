export interface IJsoneditor {
  type: string;
  data: any;
  isPreview?: boolean;
  isLayoutWidget?: boolean;
  pageIndex: number | undefined;
  actions?: any[];
  actionsAlign?: string;
  isPage?: boolean;
  tooltip?: string;
  path?: string;
}
