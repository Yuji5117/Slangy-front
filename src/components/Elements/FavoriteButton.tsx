import { BsBookmarkStar, BsFillBookmarkStarFill } from "react-icons/bs";

type FavoriteButtonProps = {
  isFavorite: boolean;
  isDisable: boolean;
  content: string;

  addToFavorite: (content: string) => void;
  removeToFavorite: () => void;
};

export const FavoriteButton = ({
  isFavorite,
  isDisable,
  content,
  addToFavorite,
  removeToFavorite,
}: FavoriteButtonProps) => {
  const ActiveFavoriteButton = () => (
    <button onClick={() => removeToFavorite()}>
      <BsFillBookmarkStarFill size="1.5rem" />
    </button>
  );

  const InactiveFavoriteButton = () => (
    <button disabled={isDisable} onClick={() => addToFavorite(content)}>
      <BsBookmarkStar size="1.5rem" />
    </button>
  );
  return (
    <>{isFavorite ? <ActiveFavoriteButton /> : <InactiveFavoriteButton />}</>
  );
};
