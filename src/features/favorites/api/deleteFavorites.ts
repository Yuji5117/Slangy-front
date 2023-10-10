import { clientApi } from "@/lib/axios";

export const deleteFavorites = async () => {
  const res = await clientApi.delete("/favorites");

  return res;
};
