import { useEffect, useState } from "react";

import { DisplayResult } from "./DispalyResult";
import { Toolbar } from "./Toolbar";
import { addFavorite } from "../api/addFavorite";
import { getFavorite } from "../api/getFavorite";
import { removeFavorite } from "../api/removeFavorite";

import { CopyClipboard, ToggleSwitchButton } from "@/components/Elements";
import { FavoriteButton } from "@/components/Elements/FavoriteButton";

type ResultType = {
  targetLang: string;
  targetWord: string;
  resultText: string;
  isDetail: boolean;

  setResult: React.Dispatch<React.SetStateAction<string>>;
  toggleDetail: () => void;
};

export const Result = ({
  targetLang,
  targetWord,
  resultText,
  isDetail,
  setResult,
  toggleDetail,
}: ResultType) => {
  const [hasFavorite, setHasFavorite] = useState<boolean>(false);

  useEffect(() => {
    setHasFavorite(false);

    if (targetWord) {
      (async () => {
        const res = await getFavorite(targetWord);

        if (res) {
          setResult(res.result);
          setHasFavorite(true);
        }
      })();
    }
  }, [setResult, targetWord]);

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
    await removeFavorite(id);

    setHasFavorite(false);
  };

  return (
    <>
      <DisplayResult displayedResult={resultText} />
      <Toolbar>
        <>
          <CopyClipboard text={resultText} />
          <FavoriteButton
            hasFavorite={hasFavorite}
            isDisabled={!targetWord || !resultText}
            language={targetLang}
            targetWord={targetWord}
            result={resultText}
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
