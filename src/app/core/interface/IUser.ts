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
  roles: string[];
}

export interface TokenUser {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  current_user: CurrentUser;
}

export interface CurrentUser {
  uid: string;
  name: string;
  roles: string[];
  login?: string;
}
