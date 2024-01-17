export interface ITitle {
  type?: 'title';
  style:
    | 'style-v1'
    | 'style-v2'
    | 'style-v3'
    | 'style-v4'
    | 'style-v5'
    | 'none';
  classes?: string;
  label: string;
  icon?: string;
  typed?: {
    enable: boolean;
    string: string[];
    config: any;
  };
}
