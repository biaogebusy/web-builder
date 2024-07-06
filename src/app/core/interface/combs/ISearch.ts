export interface ISearch {
  type: string;
  header: any;
  api: string;
  label: ISearchLabel;
  sidebar: any[];
  data: any;
}

export interface ISearchLabel {
  clear: string;
  filter: string;
}
