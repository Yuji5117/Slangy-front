import { useEffect, useState } from "react";
import { BsBookmarkStar, BsFillBookmarkStarFill } from "react-icons/bs";

import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Select from "./components/Select";
import Toolbar from "./components/Toolbar";
import { LANG_OPTIONS } from "./const";
import { useToggle } from "./hooks";

function App() {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="flex flex-col space-y-4 w-full max-w-md">
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
            <p className="text-lg">{result}</p>
            <Toolbar>
              {isFavorite ? (
                <button onClick={() => removeToFavorite()}>
                  <BsFillBookmarkStarFill />
                </button>
              ) : (
                <button
                  disabled={!targetWord || !result}
                  onClick={() => addToFavorite(result)}
                >
                  <BsBookmarkStar />
                </button>
              )}

              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  className="hidden"
                  checked={isDetail}
                  onChange={setIsDetail}
                />
                <label
                  htmlFor="toggle"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                    isDetail ? "bg-blue-400" : ""
                  }`}
                >
                  <span
                    className={`absolute block w-6 h-6 mt-1 ml-1 bg-white rounded-full shadow transition-transform transform ${
                      isDetail ? "translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </div>
            </Toolbar>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
