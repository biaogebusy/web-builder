export interface IOAuth {
  clientId: string;
  tokenUrl: string;
  authorizeUrl: string;
  redirectPath: string;
  logoutPath: string;
  scope?: string;
}

export interface IEnvironment {
  apiUrl: string;
  production: boolean;
  port: number;
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
