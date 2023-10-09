import { useState } from "react";

import { Toolbar } from "./Toolbar";
import {
  AutoResizingTextarea,
  CopyClipboard,
} from "../../../components/Elements";
import { streamSlangTranslation } from "../api/streamSlangTranslation";

import { SlangTranslation } from "@/types";

type FormProps = {
  isDetail: boolean;
  targetWord: string;
  language: string;
  setSlangTranslation: React.Dispatch<
    React.SetStateAction<Omit<SlangTranslation, "id">>
  >;
};

export const Form = ({
  isDetail,
  targetWord,
  language,
  setSlangTranslation,
}: FormProps) => {
  const [isSending, setIsSending] = useState<boolean>(false);

  const isTargetWordEmpty = targetWord.trim() === "";

  const onSlangTranslationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSending(true);
    setSlangTranslation((prev: Omit<SlangTranslation, "id">) => ({
      ...prev,
      result: "",
    }));

    try {
      const res = await streamSlangTranslation({
        language,
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
        setSlangTranslation((prev) => ({
          ...prev,
          result: prev.result + decoded,
        }));
      }

      setIsSending(false);
    } catch (error: unknown) {
      console.error("An error occurred", error);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSlangTranslation((prev) => ({
      ...prev,
      targetWord: e.target.value,
      result: "",
    }));
  };

  return (
    <form action="" onSubmit={(e) => onSlangTranslationSubmit(e)}>
      <div className="mb-3">
        <AutoResizingTextarea
          className="text-lg"
          value={targetWord}
          placeholder="スラングを入力してください。"
          onChangeHandler={onChangeHandler}
          isDisabled={isSending}
        />
      </div>

      <Toolbar>
        <>
          <CopyClipboard text={targetWord} />
        </>
        <button
          className={`${
            isTargetWordEmpty || isSending
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500"
          } text-white px-4 py-1.5 rounded-full`}
          disabled={isTargetWordEmpty || isSending}
        >
          Translate
        </button>
      </Toolbar>
    </form>
  );
};
