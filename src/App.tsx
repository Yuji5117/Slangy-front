import { useState } from "react";

import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Select from "./components/Select";
import { LANG_OPTIONS } from "./const";

function App() {
  const [result, setResult] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("Engilsh");
  // const [explainLang, setExplainLang] = useState<string>("Japanese");

  const changeTargetLang = (option: string) => {
    setTargetLang(option);
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

            <Form targetLang={targetLang} setResult={setResult} />
          </div>
          <div className="bg-white p-4 shadow-md">
            {/* Translate Result Area */}
            <p className="text-lg">{result}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
