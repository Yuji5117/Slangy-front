import { useEffect, useState } from "react";

export const useFavorite = (key: string) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favoriteResult, setFavoriteResult] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem(key)) {
      setIsFavorite(true);
      const value = localStorage.getItem(key) as string;
      setFavoriteResult(value);
    } else {
      setIsFavorite(false);
      setFavoriteResult("");
    }
  }, [key, setIsFavorite]);

  const addToFavorite = (result: string) => {
    localStorage.setItem(key, result);
    setIsFavorite(true);
  };

  const removeToFavorite = () => {
    localStorage.removeItem(key);
    setIsFavorite(false);
  };

  return { isFavorite, favoriteResult, addToFavorite, removeToFavorite };
};
