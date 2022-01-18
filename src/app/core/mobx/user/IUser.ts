export interface IUser extends TokenUser {
  id?: string;
  display_name?: string;
  user_fullname?: string;
  mail?: string;
  name?: string;
  status?: boolean;
  authenticated?: boolean;
  picture?: string;
}

export interface TokenUser {
  csrf_token: string;
  current_user: {
    uid: string;
    name: string;
    roles: string[];
  };
  logout_token: string;
}
