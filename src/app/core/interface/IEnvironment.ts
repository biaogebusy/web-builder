export interface IEnvironment {
  apiUrl: string;
  production: boolean;
  site: string;
  port: number;
  cache: boolean;
  ssr: boolean;
  drupalProxy?: boolean;
}
