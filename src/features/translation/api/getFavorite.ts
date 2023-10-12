import { clientApi } from "@/lib/axios";
import { SlangTranslation } from "@/types";

export const getFavorite = async (
  targetWord: string
): Promise<SlangTranslation> => {
  return await clientApi.get("/favorite", {
    params: {
      targetWord,
    },
  });
};
