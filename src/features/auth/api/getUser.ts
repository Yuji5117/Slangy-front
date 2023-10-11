import { AuthUser } from "../types";

import { clientApi } from "@/lib/axios";

export const getUser = async (): Promise<AuthUser> => {
  return await clientApi.get("/auth/me");
};
