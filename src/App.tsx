import axios from "axios";
import { useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [targetWord, setTargetWord] = useState<string>("");
  const [result, setResult] = useState<string>("解説結果がここに表示されます");
  const [targetLang, setTargetLang] = useState<string>("Engilsh");
  const [explainLang, setExplainLang] = useState<string>("Japanese");

  const onClickFn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axios.post(import.meta.env.VITE_API_URL, { targetWord });
    setResult(res.data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="flex flex-col space-y-4 w-full max-w-md">
          <div className="border-b border-gray-100 p-4">
            {/* Lang Select */}
            <div className="flex justify-between mb-2">
              <div className="flex-1 mr-2">
                <label className="block text-gray-700 mb-1">
                  解説対象の言語:
                </label>
                <select
                  className="border rounded-md p-2 w-full"
                  value={targetLang}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTargetLang(e.target.value)
                  }
                >
                  <option value="en">Engilsh</option>
                  <option value="ja">Japanese</option>
                  {/* 他の言語オプションをここに追加 */}
                </select>
              </div>

              <div className="flex-1 ml-2">
                <label className="block text-gray-700 mb-1">
                  解説用の言語:
                </label>
                <select
                  className="border rounded-md p-2 w-full"
                  value={explainLang}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setExplainLang(e.target.value)
                  }
                >
                  <option value="en">Japanese</option>
                  <option value="ja">Engilsh</option>
                  {/* 他の言語オプションをここに追加 */}
                </select>
              </div>
            </div>

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
                    targetWord.trim() === ""
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500"
                  } text-white px-4 py-2 rounded-md`}
                  disabled={targetWord.trim() === ""}
                >
                  explain
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white p-4 shadow-md">
            {/* Translate Result Area */}
            <p>{result}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
