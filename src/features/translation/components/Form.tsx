import { useState } from "react";

import { Toolbar } from "./Toolbar";
import {
  AutoResizingTextarea,
  CopyClipboard,
} from "../../../components/Elements";
import { streamSlangTranslation } from "../api/streamSlangTranslation";

type FormProps = {
  isDetail: boolean;
  targetWord: string;
  targetLang: string;
  setTargetWord: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
};

export const Form = ({
  isDetail,
  targetWord,
  targetLang,
  setTargetWord,
  setResult,
}: FormProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onClickFn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsDisabled(true);
    setResult("");

    try {
      const res = await streamSlangTranslation({
        targetLang,
        targetWord,
        isDetail,
      });

      const reader =
        res?.getReader() as ReadableStreamDefaultReader<Uint8Array>;

      let test = true;
      while (test) {
        const { done, value } = await reader.read();
        if (done) {
          test = false;
          break;
        }

        const decoded = new TextDecoder().decode(value);
        setResult((prev) => prev + decoded);
      }

      setIsDisabled(false);
    } catch (error: unknown) {
      console.error("An error occurred", error);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTargetWord(e.target.value);
    setResult("");
  };

  return (
    <form action="" onSubmit={(e) => onClickFn(e)}>
      <div className="mb-3">
        <AutoResizingTextarea
          className="text-lg"
          value={targetWord}
          placeholder="スラングを入力してください。"
          onChangeHandler={onChangeHandler}
        />
      </div>

      <Toolbar>
        <>
          <CopyClipboard text={targetWord} />
        </>
        <button
          className={`${
            targetWord.trim() === "" || isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500"
          } text-white px-4 py-1.5 rounded-full`}
          disabled={targetWord.trim() === "" || isDisabled}
        >
          Translate
        </button>
      </Toolbar>
    </form>
  );
};
