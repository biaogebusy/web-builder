export interface IEnvironment {
  production: boolean;
  site: string;
  port: number;
  cache: boolean;
  ssr: boolean;
  drupalProxy?: boolean;
}
