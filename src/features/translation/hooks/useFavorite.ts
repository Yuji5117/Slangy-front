import { useEffect, useState } from "react";

import { useLocalStorage } from "./useLocalStorage";

export const useFavorite = (key: string) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favoriteResult, setFavoriteResult] = useState<string>("");

  const [state, setToLocalStorage, removeFromLocalStorage] =
    useLocalStorage(key);

  useEffect(() => {
    if (state) {
      setIsFavorite(true);
      setFavoriteResult(state);
    } else {
      setIsFavorite(false);
      setFavoriteResult(state);
    }
  }, [state]);

  const addToFavorite = (result: string) => {
    setToLocalStorage(result);
    setIsFavorite(true);
  };

  const removeToFavorite = () => {
    removeFromLocalStorage();
    setIsFavorite(false);
  };

  return { isFavorite, favoriteResult, addToFavorite, removeToFavorite };
};
