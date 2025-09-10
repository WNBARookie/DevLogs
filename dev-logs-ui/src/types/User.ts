export type UserInfo = {
  id: string;
  username?: string;
  email: string;
};

export type CreateUserRequestBody = {
  username: string;
  email: string;
  password: string;
};

export type AuthenticateUserRequestBody = {
  email: string;
  password: string;
};
