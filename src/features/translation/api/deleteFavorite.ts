import { clientApi } from "@/lib/axios";
import { SlangTranslation } from "@/types";

export const deleteFavorite = async (id: string): Promise<SlangTranslation> => {
  return await clientApi.delete(`/favorites/${id}`);
};
