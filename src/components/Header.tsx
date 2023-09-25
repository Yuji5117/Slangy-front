import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="flex justify-between items-center p-4">
      <div className="font-bold text-2xl">Slangy</div>
      <button className="block lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-6 h-0.5 bg-gray-300 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-300 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-300"></div>
      </button>

      <nav
        className={`flex flex-col lg:flex-row lg:items-center ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        {/* ここにメニュー項目を追加します */}
        <Link to="/" className="mt-2 lg:mt-0 lg:ml-4">
          Translation
        </Link>
        <Link to="/favorites" className="mt-2 lg:mt-0 lg:ml-4">
          Favorites
        </Link>
      </nav>
    </header>
  );
};

export default Header;
