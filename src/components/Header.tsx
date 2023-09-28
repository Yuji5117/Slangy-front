import { AiOutlineClose } from "react-icons/ai/";
import { Link } from "react-router-dom";

import { useToggle } from "@/hooks";

type NavigationItem = {
  name: string;
  to: string;
};

const Header = () => {
  const [isOpen, setIsOpen] = useToggle(false);

  const navigation: NavigationItem[] = [
    { name: "Home", to: "/" },
    { name: "Favorites", to: "/favorites" },
  ];

  const toggleMenu = () => {
    setIsOpen();

    if (isOpen) {
      document.body.classList.remove("overflow-hidden", "pointer-events-none");
    } else {
      document.body.classList.add("overflow-hidden", "pointer-events-none");
    }
  };

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="font-bold text-2xl">
        <Link to="/">Slangy</Link>
      </h1>
      <button className="block lg:hidden" onClick={toggleMenu}>
        <div className="w-6 h-0.5 bg-gray-300 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-300 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-300"></div>
      </button>

      <nav
        className={`pointer-events-auto fixed top-0 right-0 w-64 h-full bg-white transform transition-transform ease-in-out z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4">
          <div className="flex flex-row-reverse pt-1">
            <button onClick={toggleMenu}>
              <AiOutlineClose size="1.5rem" />
            </button>
          </div>
          <ul className="pt-4 pl-3 space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="mt-2 lg:mt-0 lg:ml-4 text-lg"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* オーバーレイ */}
      {isOpen && (
        <div
          className="pointer-events-auto fixed top-0 left-0 w-full h-full bg-black opacity-50 z-5"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;
