import { useEffect, useState } from "react";

import { addFavorite } from "../api/addFavorite";
import { deleteFavorite } from "../api/deleteFavorite";
import { getFavorite } from "../api/getFavorite";

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
    await deleteFavorite(id);

    setHasFavorite(false);
  };

  return { favoriteResult, hasFavorite, addToFavorite, removeToFavorite };
};
