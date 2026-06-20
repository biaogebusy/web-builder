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
  expires_at: number;
  current_user: CurrentUser;
}

export interface CurrentUser {
  uid: string;
  name: string;
  roles: string[];
  login?: string;
}

export interface OAuthTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
}

export interface AccountProfileResponse {
  uid: string | number;
  name?: string;
  roles: string[];
}

export interface DrupalUserRole {
  meta?: {
    drupal_internal__target_id?: string;
  };
}

export interface DrupalUserDetail {
  id: string;
  name?: string;
  display_name?: string;
  mail?: string;
  phone_number?: string;
  user_picture?: {
    uri?: {
      url?: string;
    };
  };
  login?: string;
  roles?: DrupalUserRole[];
}

export interface DrupalUserListResponse {
  data: DrupalUserDetail[];
}

export interface PersonalProfileResponse {
  uid: string;
  name?: string;
  mail?: string;
  avatar?: string;
  roles?: string[];
}

export type UserProfileResponse = DrupalUserListResponse | PersonalProfileResponse;
