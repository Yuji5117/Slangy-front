import { useEffect, useState } from "react";

import { deleteFavorites } from "../api/deleteFavorites";
import { getFavorites } from "../api/getFavorites";

import { deleteFavorite } from "@/features/translation/api/deleteFavorite";
import { SlangTranslation } from "@/types";

export const useFavorites = (): [
  SlangTranslation[],
  (id: string) => Promise<void>,
  () => void
] => {
  const [favorites, setFavorites] = useState<SlangTranslation[]>([]);

  useEffect(() => {
    (async () => {
      const reposnceFavorites = await getFavorites();

      setFavorites(reposnceFavorites);
    })();
  }, []);

  const removeFavorite = async (id: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this?"
    );

    if (userConfirmed) {
      const res = await deleteFavorite(id);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.targetWord !== res.targetWord)
      );
    }
  };

  const removeAllFavorites = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete all?"
    );

    if (userConfirmed) {
      await deleteFavorites();
      setFavorites([]);
    }
  };

  return [favorites, removeFavorite, removeAllFavorites];
};
