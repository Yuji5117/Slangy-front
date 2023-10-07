import { Toolbar } from "./Toolbar";

import { CopyClipboard, ToggleSwitchButton } from "@/components/Elements";
import { FavoriteButton } from "@/components/Elements/FavoriteButton";

type ResultType = {
  displayedResult: string;
  targetLang: string;
  targetWord: string;
  isDetail: boolean;

  addToFavorite: (result: string) => void;
  removeToFavorite: () => void;
  toggleDetail: () => void;
};

export const Result = ({
  displayedResult,
  targetLang,
  targetWord,
  isDetail,

  addToFavorite,
  removeToFavorite,
  toggleDetail,
}: ResultType) => {
  return (
    <>
      <div className="mb-3">
        <p className="text-lg">{displayedResult}</p>
      </div>
      <Toolbar>
        <div className="flex space-x-5 items-center pl-2">
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
        </div>

        <div className="space-x-2">
          <span className="text-sm">詳細</span>
          <div className="inline-block w-12 mr-2 align-middle select-none">
            <ToggleSwitchButton on={isDetail} toggle={toggleDetail} />
          </div>
        </div>
      </Toolbar>
    </>
  );
};
