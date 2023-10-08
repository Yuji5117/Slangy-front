import { clientApi } from "@/lib/axios";
import { SlangTranslation } from "@/types";

export const getFavorites = async (): Promise<SlangTranslation[]> => {
  const res = await clientApi.get("/favorites");

  return res.data;
};
