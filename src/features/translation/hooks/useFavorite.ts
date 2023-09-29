import { useEffect, useState } from "react";

export const useFavorite = (key: string) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem(key)) {
      setIsFavorite(true);
      const value = localStorage.getItem(key) as string;
      console.log(value);
      // setResult(value);
    } else {
      setIsFavorite(false);
      // setResult("");
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

  return { isFavorite, addToFavorite, removeToFavorite };
};
