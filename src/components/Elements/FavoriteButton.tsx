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
  return (
    <>
      {isFavorite ? (
        <button onClick={() => removeToFavorite()}>
          <BsFillBookmarkStarFill size="1.5rem" />
        </button>
      ) : (
        <button disabled={isDisable} onClick={() => addToFavorite(content)}>
          <BsBookmarkStar size="1.5rem" />
        </button>
      )}
    </>
  );
};
