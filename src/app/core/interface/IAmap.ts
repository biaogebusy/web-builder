export interface IAmap {
  key: string;
  version: string;
  plugins: string[];
  city: string;
  zoom: number;
  center: number[];
  mapStyle: {
    [key: string]: string;
  };
  features: string[];
}

export interface IMark {
  index: number;
  item?: any;
  content: string;
  setCenter: boolean;
}

export interface IMarkInfo {
  title: string;
  subTitle: string;
  img?: string;
  badge_1?: string;
  badge_2?: string;
  url?: string;
}

export interface IMap {
  type?: string;
  city?: string;
  elements: any[];
  params?: any;
  model?: any;
}
