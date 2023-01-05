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

export interface IMap {
  city?: string;
  elements: any[];
  params?: any;
}
