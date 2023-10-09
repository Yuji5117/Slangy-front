import { useEffect, useState } from "react";

import { addFavorite } from "../api/addFavorite";
import { getFavorite } from "../api/getFavorite";
import { removeFavorite } from "../api/removeFavorite";

export const useFavorite = (key: string) => {
  const [favoriteResult, setFavoriteResult] = useState<string>("");
  const [hasFavorite, setHasFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (key) {
      (async () => {
        const res = await getFavorite(key);

        if (res) {
          setFavoriteResult(res.result);
          setHasFavorite(true);
        }
      })();
    }
  }, [key]);

  const addToFavorite = async (
    language: string,
    targetWord: string,
    result: string
  ) => {
    await addFavorite(language, targetWord, result);

    setHasFavorite(true);
  };

  const removeToFavorite = async (targetWord: string) => {
    const { id } = await getFavorite(targetWord);
    await removeFavorite(id);

    setHasFavorite(false);
  };

  return { favoriteResult, hasFavorite, addToFavorite, removeToFavorite };
};
