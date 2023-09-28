import { useEffect, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { BsBookmarkStar, BsFillBookmarkStarFill } from "react-icons/bs";

import Form from "@/components/Form";
import Select from "@/components/Select";
import ToggleSwitchButton from "@/components/ToggleSwitchButton";
import Toolbar from "@/components/Toolbar";
import { LANG_OPTIONS } from "@/const";
import { useToggle } from "@/hooks";

const Translation = () => {
  const [targetWord, setTargetWord] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("Engilsh");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isDetail, setIsDetail] = useToggle(false);

  useEffect(() => {
    if (localStorage.getItem(targetWord)) {
      setIsFavorite(true);
      const value = localStorage.getItem(targetWord) as string;
      setResult(value);
    } else {
      setIsFavorite(false);
      setResult("");
    }
  }, [targetWord, setIsFavorite]);

  const changeTargetLang = (option: string) => {
    setTargetLang(option);
  };

  const addToFavorite = (result: string) => {
    localStorage.setItem(targetWord, result);
    setIsFavorite(true);
  };

  const removeToFavorite = () => {
    localStorage.removeItem(targetWord);
    setIsFavorite(false);
  };

  const handleCopyToClipboard = async (result: string) => {
    try {
      await navigator.clipboard.writeText(result);
      alert("コピーしました");
    } catch {
      alert("コピーに失敗しました");
    }
  };

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="p-4">
        {/* Lang Select */}
        <div className="flex justify-between mb-2 border-b">
          <div className="flex-1 mr-2">
            <Select
              options={LANG_OPTIONS}
              selectedOption={targetLang}
              changeSelectedOption={changeTargetLang}
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
            <div onClick={() => handleCopyToClipboard(result)}>
              <AiOutlineCopy size="1.5rem" />
            </div>
            {isFavorite ? (
              <button onClick={() => removeToFavorite()}>
                <BsFillBookmarkStarFill size="1.5rem" />
              </button>
            ) : (
              <button
                disabled={!targetWord || !result}
                onClick={() => addToFavorite(result)}
              >
                <BsBookmarkStar size="1.5rem" />
              </button>
            )}
          </div>

          <div className="inline-block w-12 mr-2 align-middle select-none">
            <ToggleSwitchButton on={isDetail} toggle={setIsDetail} />
          </div>
        </Toolbar>
      </div>
    </section>
  );
};

export default Translation;
