import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
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
                <select className="border rounded-md p-2 w-full">
                  <option value="en">Engilsh</option>
                  <option value="ja">Japanese</option>
                  {/* 他の言語オプションをここに追加 */}
                </select>
              </div>

              <div className="flex-1 ml-2">
                <label className="block text-gray-700 mb-1">
                  解説用の言語:
                </label>
                <select className="border rounded-md p-2 w-full">
                  <option value="en">Japanese</option>
                  <option value="ja">Engilsh</option>
                  {/* 他の言語オプションをここに追加 */}
                </select>
              </div>
            </div>

            {/* Translate Input Area */}
            <div className="mb-2">
              <textarea
                className="w-full h-20 p-2 border rounded-md"
                placeholder="テキストを入力してください..."
              ></textarea>
            </div>

            {/* Button Toolbar */}
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                explain
              </button>
            </div>
          </div>
          <div className="bg-white p-4 shadow-md">
            {/* Translate Result Area */}
            <p>解説結果がここに表示されます</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
