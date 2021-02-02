import { IUser } from './user/IUser';
export interface IAppConfig {
  defTheme: string; // light, dark
  config?: any;
  currentUser: IUser;
}
