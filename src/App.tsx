import { useEffect, useState } from "react";
import { BsBookmarkStar, BsFillBookmarkStarFill } from "react-icons/bs";

import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Select from "./components/Select";
import Toolbar from "./components/Toolbar";
import { LANG_OPTIONS } from "./const";

function App() {
  const [targetWord, setTargetWord] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("Engilsh");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem(targetWord)) {
      setIsFavorite(true);
      const value = localStorage.getItem(targetWord) as string;
      setResult(value);
    } else {
      setIsFavorite(false);
      setResult("");
    }
  }, [targetWord]);

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
          <div className="border-b border-gray-100 p-4">
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

            <Form
              targetWord={targetWord}
              targetLang={targetLang}
              setTargetWord={setTargetWord}
              setResult={setResult}
            />
          </div>
          <div className="bg-white p-4 shadow-md">
            {/* Translate Result Area */}
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
            </Toolbar>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
