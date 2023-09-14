import axios from "axios";
import { useState } from "react";

type FormProps = {
  setResult: React.Dispatch<React.SetStateAction<string>>;
};

const Form = ({ setResult }: FormProps) => {
  const [targetWord, setTargetWord] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onClickFn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsDisabled(true);
    setResult("...");
    const res = await axios.post(import.meta.env.VITE_API_URL, { targetWord });
    setResult(res.data.message);
    console.log("tesu");
    setIsDisabled(false);
  };

  return (
    <form action="" onSubmit={(e) => onClickFn(e)}>
      {/* Translate Input Area */}
      <div className="mb-2">
        <textarea
          className="w-full h-20 p-2 border rounded-md"
          placeholder="テキストを入力してください..."
          value={targetWord}
          onChange={(e) => setTargetWord(e.target.value)}
        ></textarea>
      </div>

      {/* Button Toolbar */}
      <div className="flex justify-end">
        <button
          className={`${
            targetWord.trim() === "" || isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500"
          } text-white px-4 py-2 rounded-md`}
          disabled={targetWord.trim() === "" || isDisabled}
        >
          explain
        </button>
      </div>
    </form>
  );
};

export default Form;
