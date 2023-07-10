export interface IDashboard {
  type: string;
  elements: IDashboardBox[];
}

export interface IDashboardBox {
  title?: {
    label: string;
  };
  row: number;
  params?: {
    [key: string]: string;
  };
  form?: any[];
  widget: any;
}
