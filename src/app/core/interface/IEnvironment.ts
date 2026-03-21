export interface IOAuth {
  clientId: string;
  tokenUrl: string;
  scope: string;
}

export interface IEnvironment {
  apiUrl: string;
  production: boolean;
  port: number;
  cache: boolean;
  drupalProxy?: boolean;
  multiLang?: boolean;
  langs?: ILanguage[];
  oauth: IOAuth;
}

export interface ILanguage {
  label: string;
  langCode: string;
  default?: boolean;
  prefix: string;
}
