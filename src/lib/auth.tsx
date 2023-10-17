// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { configureAuth } from "react-query-auth";

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
  if (storage.getToken()) {
    const user = await getUser();
    return user;
  }
  return null;
};

const loginFn = async (data: LoginCredentialsDTO) => {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
};

const registerFn = async (data: RegisterCredentialsDTO) => {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
};

const logoutFn = async () => {
  console.log("ログアおうと");
  storage.clearToken();
};

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
  });
