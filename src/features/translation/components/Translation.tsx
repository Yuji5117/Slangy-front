import { useState } from "react";

import { useFavorite } from "../hooks/useFavorite";

import { CopyClipboard, ToggleSwitchButton } from "@/components/Elements";
import { FavoriteButton } from "@/components/Elements/FavoriteButton";
import { Select } from "@/components/Select";
import { LANG_OPTIONS } from "@/const";
import { Form } from "@/features/translation/components/Form";
import { Toolbar } from "@/features/translation/components/Toolbar";
import { useToggle } from "@/hooks";

export const Translation = () => {
  const [targetWord, setTargetWord] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("Engilsh");
  const [isDetail, setIsDetail] = useToggle(false);

  const { isFavorite, addToFavorite, removeToFavorite } =
    useFavorite(targetWord);

  // useEffect(() => {
  //   if (localStorage.getItem(targetWord)) {
  //     setResult(value);
  //   } else {
  //     setResult("");
  //   }
  // }, [targetWord, setIsFavorite]);

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="p-4">
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
      </div>
      <div className="bg-white p-4 shadow-md">
        <div className="mb-3">
          <p className="text-lg">{result}</p>
        </div>
        <Toolbar>
          <div className="flex space-x-5 items-center pl-2">
            <CopyClipboard text={result} />
            <FavoriteButton
              isFavorite={isFavorite}
              isDisable={!targetWord || !result}
              content={result}
              addToFavorite={addToFavorite}
              removeToFavorite={removeToFavorite}
            />
          </div>

          <div className="space-x-2">
            <span className="text-sm">詳細</span>
            <div className="inline-block w-12 mr-2 align-middle select-none">
              <ToggleSwitchButton on={isDetail} toggle={setIsDetail} />
            </div>
          </div>
        </Toolbar>
      </div>
    </section>
  );
};
