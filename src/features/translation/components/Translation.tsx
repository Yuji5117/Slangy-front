import { useState } from "react";

import { Result } from "./Result";

import { Select } from "@/components/Elements";
import { LANG_OPTIONS } from "@/const";
import { Form } from "@/features/translation/components/Form";
import { useToggle } from "@/hooks";
import { SlangTranslation } from "@/types";

export const Translation = () => {
  const [slangTranslation, setSlangTranslation] = useState<
    Omit<SlangTranslation, "id">
  >({
    language: "English",
    targetWord: "",
    result: "",
  });
  const [isDetail, toggleDetail] = useToggle(false);

  const setLanguage = (option: string) => {
    setSlangTranslation((prev) => ({ ...prev, language: option }));
  };

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="border-b p-4 bg-white">
        <div className="flex justify-between mb-2 border-b">
          <div className="flex-1 mr-2">
            <Select
              options={LANG_OPTIONS}
              selectedOption={slangTranslation.language}
              changeSelectedOption={setLanguage}
            />
          </div>
        </div>

        <div className="border-b pb-4 border-gray-100">
          <Form
            isDetail={isDetail}
            targetWord={slangTranslation.targetWord}
            language={slangTranslation.language}
            setSlangTranslation={setSlangTranslation}
          />
        </div>

        <div className="pt-5">
          <Result
            slangTranslation={slangTranslation}
            isDetail={isDetail}
            setSlangTranslation={setSlangTranslation}
            toggleDetail={toggleDetail}
          />
        </div>
      </div>
    </section>
  );
};
