import { useToggle } from "@/hooks/useToggle";

type SelectProps = {
  options: string[];
  selectedOption: string;
  changeSelectedOption: (option: string) => void;
};

const Select = ({
  options,
  selectedOption,
  changeSelectedOption,
}: SelectProps) => {
  const [isOptionsMenuOpen, toggleOptionsMenu] = useToggle();

  const handleOptionClick = (option: string) => {
    changeSelectedOption(option);
    toggleOptionsMenu();
  };

  return (
    <>
      <div className="relative">
        <div
          role="button"
          tabIndex={0}
          onClick={() => toggleOptionsMenu()}
          className="border-none py-2 px-4 w-full"
        >
          <p>{selectedOption}</p>
        </div>
        <div
          className={`absolute mt-2 w-64 rounded-md shadow-lg bg-white ${
            isOptionsMenuOpen ? "" : "hidden"
          }`}
        >
          <ul
            role="listbox"
            className="shadow overflow-hidden border border-gray-100 rounded-md"
          >
            {options.map((option) => (
              <li
                role="listbox"
                key={option}
                className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Select;
