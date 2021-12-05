export interface IAmap {
  key: string;
  version: string;
  plugins: string[];
  citi: string;
  zoom: number;
  center: number[];
  mapStyle: {
    [key: string]: string
  };
  features: string[];
}
