import { BsBookmarkStar, BsFillBookmarkStarFill } from "react-icons/bs";

type FavoriteButtonProps = {
  hasFavorite: boolean;
  isDisabled: boolean;
  language: string;
  targetWord: string;
  result: string;

  addToFavorite: (language: string, targetWord: string, result: string) => void;
  removeFromFavorite: (id: string) => void;
};

export const FavoriteButton = ({
  hasFavorite,
  isDisabled,
  language,
  targetWord,
  result,
  addToFavorite,
  removeFromFavorite,
}: FavoriteButtonProps) => {
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
