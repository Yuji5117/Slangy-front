import { useEffect, useState } from "react";

import { useLocalStorage } from "@/hooks";

export const useFavorite = (key: string) => {
  const [favoriteResult, setFavoriteResult] = useState<string>("");

  const {
    state,
    set: setToLocalStorage,
    remove: removeFromLocalStorage,
  } = useLocalStorage(key);

  useEffect(() => {
    if (state) {
      setFavoriteResult(state);
    } else {
      setFavoriteResult(state);
    }
  }, [state]);

  const addToFavorite = (result: string) => {
    setToLocalStorage(result);
  };

  const removeToFavorite = () => {
    removeFromLocalStorage();
  };

  return { favoriteResult, addToFavorite, removeToFavorite };
};
