import { clientApi } from "@/lib/axios";

export const deleteFavorites = async () => {
  return await clientApi.delete("/favorites");
};
