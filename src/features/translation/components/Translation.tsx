import { useState } from "react";

import { DisplayResult } from "./DispalyResult";
import { Toolbar } from "./Toolbar";
import { useFavorite } from "../hooks/useFavorite";

import {
  CopyClipboard,
  Select,
  ToggleSwitchButton,
} from "@/components/Elements";
import { FavoriteButton } from "@/components/Elements/FavoriteButton";
import { LANG_OPTIONS } from "@/const";
import { Form } from "@/features/translation/components/Form";
import { useToggle } from "@/hooks";

export const Translation = () => {
  const [targetWord, setTargetWord] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("English");
  const [isDetail, toggleDetail] = useToggle(false);

  const { favoriteResult, addToFavorite, removeToFavorite } =
    useFavorite(targetWord);

  const displayedResult: string =
    favoriteResult === "" ? result : JSON.parse(favoriteResult).result;

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="border-b p-4 bg-white">
        {/* Lang Select */}
        <div className="flex justify-between mb-2 border-b">
          <div className="flex-1 mr-2">
            <Select
              options={LANG_OPTIONS}
              selectedOption={targetLang}
              changeSelectedOption={setTargetLang}
            />
          </div>
        </div>

        <div className="border-b pb-4 border-gray-100">
          <Form
            isDetail={isDetail}
            targetWord={targetWord}
            targetLang={targetLang}
            setTargetWord={setTargetWord}
            setResult={setResult}
          />
        </div>
        <div className="pt-5">
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
        </div>
      </div>
    </section>
  );
};
