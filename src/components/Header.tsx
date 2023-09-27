import { AiOutlineClose } from "react-icons/ai/";
import { Link } from "react-router-dom";

import { useToggle } from "@/hooks";

const Header = () => {
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <header className="flex justify-between items-center p-4">
      <div className="font-bold text-2xl">Slangy</div>
      <button className="block lg:hidden" onClick={setIsOpen}>
        <div className="w-6 h-0.5 bg-gray-300 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-300 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-300"></div>
      </button>

      <nav
        className={`fixed top-0 right-0 w-64 h-full bg-gray-200 transform transition-transform ease-in-out z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex "></div>
        <button onClick={setIsOpen}>
          <AiOutlineClose />
        </button>
        <Link to="/" className="mt-2 lg:mt-0 lg:ml-4" onClick={setIsOpen}>
          Translation
        </Link>
        <Link
          to="/favorites"
          className="mt-2 lg:mt-0 lg:ml-4"
          onClick={setIsOpen}
        >
          Favorites
        </Link>
      </nav>

      {/* オーバーレイ */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-2"
          onClick={setIsOpen}
        ></div>
      )}
    </header>
  );
};

export default Header;
