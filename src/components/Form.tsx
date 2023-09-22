import { useState } from "react";

import AutoResizingTextarea from "./AutoResizingTextarea";
import Toolbar from "./Toolbar";

import { API_URL } from "@/config";

type FormProps = {
  isDetail: boolean;
  targetWord: string;
  targetLang: string;
  setTargetWord: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
};

const Form = ({
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
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          targetLang,
          targetWord,
          prompt: [
            {
              role: "system",
              content: `You are an ${targetLang} slang master. Your task is to translate incoming ${targetLang} slang and show only meaning in Japanese`,
            },
            {
              role: "user",
              content: `「${targetWord}」というスラングの${
                isDetail
                  ? "意味とイメージしやすいように解説を日本語でお願いします。（例文は不要です）"
                  : "意味だけを端的に日本語訳してください。"
              }`,
            },
          ],
        }),
      });

      const reader =
        res?.body?.getReader() as ReadableStreamDefaultReader<Uint8Array>;

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
  };

  return (
    <form action="" onSubmit={(e) => onClickFn(e)}>
      {/* Translate Input Area */}
      <div className="mb-2">
        <AutoResizingTextarea
          value={targetWord}
          placeholder="スラングを入力してください。"
          onChangeHandler={onChangeHandler}
        />
      </div>

      {/* Button Toolbar */}
      <Toolbar>
        <button
          className={`${
            targetWord.trim() === "" || isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500"
          } text-white px-4 py-2 rounded-md`}
          disabled={targetWord.trim() === "" || isDisabled}
        >
          Translate
        </button>
      </Toolbar>
    </form>
  );
};

export default Form;
