import { IUser } from './user/IUser';
export interface IAppConfig {
  defTheme: string;
  config?: any;
  page: IPage;
}

export interface IApiUrl {
  apiBase: string;
  loginPath: string;
  logoutPath: string;
  userIdGetPath: string;
  userGetPath: string;
  nodeGetPath: string;
  taxonomyGetPath: string;
  commentGetPath: string;
  flaggingGetPath: string;
  paymentPath: string;
}

export interface IPage {
  meta?: any[];
  config?: any;
  title: string;
  body: any[];
}
