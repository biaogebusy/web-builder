export interface IEnvironment {
  apiUrl: string;
  production: boolean;
  port: number;
  cache: boolean;
  drupalProxy?: boolean;
  multiLang?: boolean;
  langs?: ILanguage[];
}

export interface ILanguage {
  label: string;
  langCode: string;
  default?: boolean;
  prefix: string;
}
