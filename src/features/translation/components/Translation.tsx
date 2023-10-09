import { useState } from "react";

import { Result } from "./Result";

import { Select } from "@/components/Elements";
import { LANG_OPTIONS } from "@/const";
import { Form } from "@/features/translation/components/Form";
import { useToggle } from "@/hooks";

export const Translation = () => {
  const [targetLang, setTargetLang] = useState<string>("English");
  const [targetWord, setTargetWord] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isDetail, toggleDetail] = useToggle(false);

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="border-b p-4 bg-white">
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
            resultText={result}
            isDetail={isDetail}
            setResult={setResult}
            toggleDetail={toggleDetail}
          />
        </div>
      </div>
    </section>
  );
};
