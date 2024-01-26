export interface IJsoneditor {
  type: string;
  data: any;
  isPreview?: boolean;
  isLayoutWidget?: boolean;
  i?: number;
  index: number;
  actions?: any[];
  actionsAlign?: string;
  isPage?: boolean;
  tooltip?: string;
}
