import { BsBookmarkStar, BsFillBookmarkStarFill } from "react-icons/bs";

type FavoriteButtonProps = {
  hasFavorite: boolean;
  isDisabled: boolean;
  content: string;

  addToFavorite: (content: string) => void;
  removeFromFavorite: () => void;
};

export const FavoriteButton = ({
  hasFavorite,
  isDisabled,
  content,
  addToFavorite,
  removeFromFavorite,
}: FavoriteButtonProps) => {
  if (hasFavorite) {
    return (
      <button onClick={() => removeFromFavorite()}>
        <BsFillBookmarkStarFill size="1.5rem" />
      </button>
    );
  }

  return (
    <button disabled={isDisabled} onClick={() => addToFavorite(content)}>
      <BsBookmarkStar size="1.5rem" />
    </button>
  );
};
