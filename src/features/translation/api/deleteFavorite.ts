import { clientApi } from "@/lib/axios";
import { SlangTranslation } from "@/types";

export const deleteFavorite = async (id: string): Promise<SlangTranslation> => {
  const res = await clientApi.delete(`/favorites/${id}`);

  return res.data;
};
