import { useOptionsMenu } from "@/hooks/useOptionsMenu";

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
  const [isOptionsMenuOpen, toggleOptionsMenu] = useOptionsMenu();

  return (
    <>
      <div className="relative">
        <div
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
          <ul className="shadow overflow-hidden border border-gray-100 rounded-md">
            {options.map((option) => (
              <li
                key={option}
                className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                onClick={() => {
                  changeSelectedOption(option);
                  toggleOptionsMenu();
                }}
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
