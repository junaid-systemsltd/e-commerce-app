import { Roles } from './api.types';

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

export type User = {
  email: string;
  name: string;
  role: Roles;
  access_token: string;
  refresh_token: string;
};
