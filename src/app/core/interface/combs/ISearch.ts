export interface ISearch {
  type: string;
  header: any;
  api: string;
  label: ISearchLabel;
  sidebar: any[];
  template: string;
  wrapperClasses: string;
  colClasses: string;
}

export interface ISearchLabel {
  clear: string;
  filter: string;
}
