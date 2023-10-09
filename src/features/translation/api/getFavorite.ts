import { clientApi } from "@/lib/axios";
import { SlangTranslation } from "@/types";

export const getFavorite = async (
  targetWord: string
): Promise<SlangTranslation> => {
  const res = await clientApi.get("/favorite", {
    params: {
      targetWord,
    },
  });

  return res.data;
};
