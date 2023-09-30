import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Translation } from "@/types";

export const useFavorites = (): [
  Translation[],
  Dispatch<SetStateAction<Translation[]>>,
  () => void
] => {
  const [favorites, setFavorites] = useState<Translation[]>([]);

  useEffect(() => {
    const newFavorites: Translation[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      const value = localStorage.getItem(key);
      if (!value) continue;

      try {
        const { result, lang }: Pick<Translation, "result" | "lang"> =
          JSON.parse(value);

        newFavorites.push({
          lang,
          sourceWord: key,
          result,
        });
      } catch (error) {
        console.error("Error parsing localStorage item:", error);
      }
    }

    setFavorites(newFavorites);
  }, []);

  const removeAllFavorites = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (userConfirmed) {
      localStorage.clear();
      setFavorites([]);
    }
  };

  return [favorites, setFavorites, removeAllFavorites];
};
