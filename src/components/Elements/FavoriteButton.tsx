import { BsBookmarkStar, BsFillBookmarkStarFill } from "react-icons/bs";

import { SlangTranslation } from "@/types";

type FavoriteButtonProps = {
  hasFavorite: boolean;
  isDisabled: boolean;
  slangTranslation: Omit<SlangTranslation, "id">;

  addToFavorite: (language: string, targetWord: string, result: string) => void;
  removeFromFavorite: (id: string) => void;
};

export const FavoriteButton = ({
  hasFavorite,
  isDisabled,
  slangTranslation,
  addToFavorite,
  removeFromFavorite,
}: FavoriteButtonProps) => {
  const { language, targetWord, result } = slangTranslation;

  if (hasFavorite) {
    return (
      <button onClick={() => removeFromFavorite(targetWord)}>
        <BsFillBookmarkStarFill size="1.5rem" />
      </button>
    );
  }

  return (
    <button
      disabled={isDisabled}
      onClick={() => addToFavorite(language, targetWord, result)}
    >
      <BsBookmarkStar size="1.5rem" />
    </button>
  );
};
