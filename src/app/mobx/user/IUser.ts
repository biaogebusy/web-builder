export interface IUser {
  id?: string;
  display_name?: string;
  user_fullname?: string;
  mail?: string;
  name?: string;
  status?: boolean;
  authenticated?: boolean;
  current_user?: any;
  csrf_token?: string;
  logout_token?: string;
}

export interface TokenUser {
  csrf_token: string;
  current_user: {
    uid: string;
    name: string;
  };
  logout_token: string;
}
