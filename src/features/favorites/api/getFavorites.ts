import { clientApi } from "@/lib/axios";
import { SlangTranslation } from "@/types";

export const getFavorites = async (): Promise<SlangTranslation[]> => {
  return await clientApi.get("/favorites");
};
