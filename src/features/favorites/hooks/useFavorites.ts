import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { getFavorites } from "../api/getFavorites";

import { SlangTranslation } from "@/types";

export const useFavorites = (): [
  SlangTranslation[],
  Dispatch<SetStateAction<SlangTranslation[]>>,
  () => void
] => {
  const [favorites, setFavorites] = useState<SlangTranslation[]>([]);

  useEffect(() => {
    (async () => {
      const reposnceFavorites = await getFavorites();

      setFavorites(reposnceFavorites);
    })();
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
