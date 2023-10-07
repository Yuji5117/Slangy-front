import { useState } from "react";

import { Result } from "./Result";
import { useFavorite } from "../hooks/useFavorite";

import { Select } from "@/components/Elements";
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
          <Result
            targetLang={targetLang}
            targetWord={targetWord}
            isDetail={isDetail}
            displayedResult={displayedResult}
            addToFavorite={addToFavorite}
            removeToFavorite={removeToFavorite}
            toggleDetail={toggleDetail}
          />
        </div>
      </div>
    </section>
  );
};
