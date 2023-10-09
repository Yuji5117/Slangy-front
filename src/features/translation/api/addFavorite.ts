import { clientApi } from "@/lib/axios";
import { SlangTranslation } from "@/types";

export const addFavorite = async (
  language: string,
  targetWord: string,
  result: string
): Promise<SlangTranslation> => {
  const res = await clientApi.post("/favorites", {
    language,
    targetWord,
    result,
  });

  return res.data;
};
