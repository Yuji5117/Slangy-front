import { configureAuth } from "node_modules/react-query-auth/dist";

import { getUser } from "@/features/auth/api/getUser";
import {
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
} from "@/features/auth/api/login";
import {
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
} from "@/features/auth/api/register";
import { UserResponse } from "@/features/auth/types";
import { storage } from "@/utils/storage";

const handleUserResponse = async (data: UserResponse) => {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
};

const userFn = async () => {
  const user = await getUser();
  return user ?? null;
};

const loginFn = async (data: LoginCredentialsDTO) => {
  const response = await loginWithEmailAndPassword(data);
  const user = handleUserResponse(response);
  return user;
};

const registerFn = async (data: RegisterCredentialsDTO) => {
  const response = await registerWithEmailAndPassword(data);
  const user = handleUserResponse(response);
  return user;
};

const logoutFn = async () => {
  storage.clearToken();
};

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn,
  loginFn: loginFn,
  registerFn,
  logoutFn,
});
