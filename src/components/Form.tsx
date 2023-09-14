import { useState } from "react";

import Toolbar from "./Toolbar";

import { axios } from "@/lib/axios";

type FormProps = {
  targetLang: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
};

const Form = ({ targetLang, setResult }: FormProps) => {
  const [targetWord, setTargetWord] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onClickFn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsDisabled(true);
    setResult("...");

    try {
      const res = await axios.post("explanation", { targetLang, targetWord });

      setResult(res.data.message);
      setIsDisabled(false);
    } catch (error: unknown) {
      console.error("An error occurred", error);
    }
  };

  return (
    <form action="" onSubmit={(e) => onClickFn(e)}>
      {/* Translate Input Area */}
      <div className="mb-2">
        <textarea
          className="w-full p-2 border-none rounded-md"
          placeholder="スラングを入力してください..."
          value={targetWord}
          rows={1}
          onChange={(e) => setTargetWord(e.target.value)}
        ></textarea>
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
