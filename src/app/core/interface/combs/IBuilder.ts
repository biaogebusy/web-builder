export interface IComponentToolbar {
  type?: string;
  content?: {
    type: string;
    [key: string]: any;
  };
  [key: string]: any;
}
