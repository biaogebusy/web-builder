import { IUser } from './user/IUser';
export interface IAppConfig {
  defTheme: string; // light, dark
  config?: any;
  currentUser: IUser;
}

export interface IApiUrl {
  apiBase: string;
  localConfigUrl: string;
  brandingConfigUrl: string;
  coreConfigUrl: string;
  loginPath: string;
  logoutPath: string;
  userIdGetPath: string;
  nodeGetPath: string;
  userGetPath: string;
}
