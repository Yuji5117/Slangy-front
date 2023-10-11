import { UserResponse } from "../types";

import { clientApi } from "@/lib/axios";

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
};

export const registerWithEmailAndPassword = async (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  return await clientApi.post("/auth/register", data);
};
