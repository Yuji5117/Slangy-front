import { DisplayResult } from "./DispalyResult";
import { Toolbar } from "./Toolbar";
import { useFavorite } from "../hooks/useFavorite";

import { CopyClipboard, ToggleSwitchButton } from "@/components/Elements";
import { FavoriteButton } from "@/components/Elements/FavoriteButton";

type ResultType = {
  targetLang: string;
  targetWord: string;
  resultText: string;
  isDetail: boolean;
  toggleDetail: () => void;
};

export const Result = ({
  targetLang,
  targetWord,
  resultText,
  isDetail,
  toggleDetail,
}: ResultType) => {
  const { favoriteResult, addToFavorite, removeToFavorite } =
    useFavorite(targetWord);

  const displayedResult: string =
    favoriteResult === "" ? resultText : JSON.parse(favoriteResult).result;

  return (
    <>
      <DisplayResult displayedResult={displayedResult} />
      <Toolbar>
        <>
          <CopyClipboard text={displayedResult} />
          <FavoriteButton
            isFavorite={displayedResult !== ""}
            isDisable={!targetWord || !displayedResult}
            content={JSON.stringify({
              result: displayedResult,
              lang: targetLang,
            })}
            addToFavorite={addToFavorite}
            removeToFavorite={removeToFavorite}
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
