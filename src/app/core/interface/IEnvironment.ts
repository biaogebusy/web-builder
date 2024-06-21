export interface IEnvironment {
  apiUrl: string;
  production: boolean;
  port: number;
  cache: boolean;
  ssr: boolean;
  drupalProxy?: boolean;
  multiLang?: boolean;
  langs?: ILanguage[];
}

export interface ILanguage {
  label: string;
  value: string;
  default?: boolean;
  prefix: string;
}
