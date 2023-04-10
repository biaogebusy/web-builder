export interface IDashboard {
  elements: IDashboardBox[];
}

export interface IDashboardBox {
  title?: {
    label: string;
  };
  row: number;
  params?: {
    api: string;
  };
  form?: any[];
  widget: any;
}
