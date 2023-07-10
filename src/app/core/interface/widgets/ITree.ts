export interface ITree {
  type?: 'tree';
  label: string;
  nodes: any[];
  options?: any;
  expandAll: boolean;
  key: string;
  value?: number;
}
