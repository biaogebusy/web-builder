export interface IUser extends TokenUser, IUserProfile {}

export interface IUserProfile {
  id: string;
  display_name?: string;
  user_fullname?: string;
  mail?: string;
  name?: string;
  status?: boolean;
  authenticated: boolean;
  picture?: string;
  login: string;
}

export interface TokenUser {
  csrf_token: string;
  current_user: CurrentUser;
  logout_token: string;
}

export interface CurrentUser {
  uid: string;
  name: string;
  roles: string[];
  login?: string;
}
