export interface LoginUser {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  access_token: string;
  refresh_token: string;
}

export type UserT = IUser | null;
