import { useEffect, useState } from "react";

import { DisplayResult } from "./DispalyResult";
import { Toolbar } from "./Toolbar";
import { addFavorite } from "../api/addFavorite";
import { deleteFavorite } from "../api/deleteFavorite";
import { getFavorite } from "../api/getFavorite";

import { CopyClipboard, ToggleSwitchButton } from "@/components/Elements";
import { FavoriteButton } from "@/components/Elements/FavoriteButton";
import { SlangTranslation } from "@/types";

type ResultType = {
  slangTranslation: Omit<SlangTranslation, "id">;
  isDetail: boolean;

  setSlangTranslation: React.Dispatch<
    React.SetStateAction<Omit<SlangTranslation, "id">>
  >;
  toggleDetail: () => void;
};

export const Result = ({
  slangTranslation,
  isDetail,
  setSlangTranslation,
  toggleDetail,
}: ResultType) => {
  const [hasFavorite, setHasFavorite] = useState<boolean>(false);

  const { targetWord, result } = slangTranslation;

  useEffect(() => {
    setHasFavorite(false);

    if (targetWord) {
      (async () => {
        const res = await getFavorite(targetWord);

        if (res) {
          setSlangTranslation((prev) => ({ ...prev, result: res.result }));
          setHasFavorite(true);
        }
      })();
    }
  }, [setSlangTranslation, targetWord]);

  const addToFavorite = async (
    language: string,
    targetWord: string,
    result: string
  ) => {
    await addFavorite(language, targetWord, result);

    setHasFavorite(true);
  };

  const removeToFavorite = async (targetWord: string) => {
    const { id } = await getFavorite(targetWord);
    await deleteFavorite(id);

    setHasFavorite(false);
  };

  return (
    <>
      <DisplayResult displayedResult={result} />
      <Toolbar>
        <>
          <CopyClipboard text={result} />
          <FavoriteButton
            hasFavorite={hasFavorite}
            isDisabled={!targetWord || !result}
            slangTranslation={slangTranslation}
            addToFavorite={addToFavorite}
            removeFromFavorite={removeToFavorite}
          />
        </>

        <>
          <span className="text-sm">詳細</span>
          <div className="inline-block w-12 mr-2 align-middle select-none">
            <ToggleSwitchButton on={isDetail} toggle={toggleDetail} />
          </div>
        </>
      </Toolbar>
    </>
  );
};
