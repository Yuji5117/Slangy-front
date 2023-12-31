export type AuthUser = {
  id: string;
  email: string;
  password: string;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
