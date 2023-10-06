import { useState } from "react";

import { Toolbar } from "./Toolbar";
import {
  AutoResizingTextarea,
  CopyClipboard,
} from "../../../components/Elements";

import { API_URL } from "@/config";

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
                  ? "意味とイメージしやすいように解説を日本語でお願いします。（例文は不要です）またスラングでない場合は、その旨と簡単な意味だけ教えてください。"
                  : "意味だけを端的に日本語訳してください。またスラングでない場合は、その旨と簡単な意味だけ教えてください。"
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
        <div className="flex space-x-5 items-center pl-2">
          <CopyClipboard text={targetWord} />
        </div>
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
