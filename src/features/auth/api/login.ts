import { UserResponse } from "../types";

import { clientApi } from "@/lib/axios";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return await clientApi.post("/auth/login", data);
};
