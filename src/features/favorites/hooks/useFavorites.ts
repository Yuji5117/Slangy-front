import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { deleteFavorites } from "../api/deleteFavorites";
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

  const removeAllFavorites = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (userConfirmed) {
      await deleteFavorites();
      setFavorites([]);
    }
  };

  return [favorites, setFavorites, removeAllFavorites];
};
