export enum Roles {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type RegisterUser = {
  email: string;
  name: string;
  password: string;
  role: Roles;
  avatar: string;
};

export type ProfileApiResponse = {
  avatar: string;
  email: string;
  id: number;
  name: string;
  password: string;
  role: Roles;
  creationAt: Date;
  updatedAt: Date;
};

export type UsersList = ProfileApiResponse[];
