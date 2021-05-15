import { IUser } from './user/IUser';
export interface IAppConfig {
  defTheme: string;
  config?: any;
  currentUser: IUser;
  page: IPage;
}

export interface IApiUrl {
  apiBase: string;
  loginPath: string;
  logoutPath: string;
  userIdGetPath: string;
  nodeGetPath: string;
  userGetPath: string;
  taxonomyGetPath: string;
}

export interface IPage {
  meta?: any;
  title: string;
  body: any[];
}
