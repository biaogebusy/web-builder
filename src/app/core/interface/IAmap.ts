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
  marker: string;
  item?: any;
}
