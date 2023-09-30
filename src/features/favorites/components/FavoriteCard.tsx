import { Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai/";

import { useLocalStorage } from "@/hooks";
import { Translation } from "@/types";

type FavoriteCardProps = {
  lang: string;
  sourceWord: string;
  result: string;

  setFavorites: Dispatch<React.SetStateAction<Translation[]>>;
};

export const FavoriteCard = ({
  lang,
  sourceWord,
  result,
  setFavorites,
}: FavoriteCardProps) => {
  const { remove: removeFavorite } = useLocalStorage(sourceWord);

  const handleRemoveFavoriteClick = () => {
    removeFavorite();
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.sourceWord !== sourceWord)
    );
  };
  return (
    <>
      <div className="flex justify-between py-4 px-3 border-b align-middle">
        <div>{lang}</div>
        <div className="opacity-30" onClick={handleRemoveFavoriteClick}>
          <AiOutlineClose size="1.5rem" />
        </div>
      </div>
      <div className="">
        <div className="pt-5 pb-2">
          <p className="text-lg mx-3 border-b border-black">{sourceWord}</p>
        </div>
        <div className="pt-2 pb-5">
          <p className="text-lg px-3">{result}</p>
        </div>
      </div>
    </>
  );
};
