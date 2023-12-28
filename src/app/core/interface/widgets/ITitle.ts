export interface ITitle {
  type?: 'title';
  style: string;
  classes?: string;
  label: string;
  icon?: string;
  typed?: {
    enable: boolean;
    string: string[];
    config: any;
  };
}
