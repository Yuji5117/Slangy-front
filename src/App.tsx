import { useState } from "react";

import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";

function App() {
  const [result, setResult] = useState<string>("結果がここに表示されます");
  const [targetLang, setTargetLang] = useState<string>("Engilsh");
  const [explainLang, setExplainLang] = useState<string>("Japanese");

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
                  <option value="English">Engilsh</option>
                  <option value="Korean">Korean</option>
                  <option value="Japanese">Japanese</option>
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

            <Form targetLang={targetLang} setResult={setResult} />
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
