import { AiOutlineClose } from "react-icons/ai/";

import { SlangTranslation } from "@/types";

type FavoriteCardProps = {
  slangTranslation: SlangTranslation;

  removeFavorite: (id: string) => Promise<void>;
};

export const FavoriteCard = ({
  slangTranslation,
  removeFavorite,
}: FavoriteCardProps) => {
  const { id, language, targetWord, result } = slangTranslation;

  const handleRemoveFavoriteClick = () => {
    removeFavorite(id);
  };
  return (
    <>
      <div className="flex justify-between py-4 px-3 border-b align-middle">
        <div>{language}</div>
        <div className="opacity-30" onClick={handleRemoveFavoriteClick}>
          <AiOutlineClose size="1.5rem" />
        </div>
      </div>
      <div className="">
        <div className="pt-5 pb-2">
          <p className="text-lg mx-3 border-b border-black">{targetWord}</p>
        </div>
        <div className="pt-2 pb-5">
          <p className="text-lg px-3">{result}</p>
        </div>
      </div>
    </>
  );
};
