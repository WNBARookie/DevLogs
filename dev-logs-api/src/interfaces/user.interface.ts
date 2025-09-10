import { Types } from 'mongoose';

export interface User {
  _id?: any; //TODO: fix type
  //   id: string;
  token?: string;
  username?: string;
  email: string;
  password?: string;
}

export interface UserInfo {
  id: string;
  username?: string;
  email: string;
}

export interface CreateUserRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface AuthenticateUserRequestBody {
  email: string;
  password: string;
}
