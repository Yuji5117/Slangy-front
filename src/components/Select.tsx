import { useState } from "react";

type SlectProps = {
  options: string[];
  selectedOption: string;
  changeSelectedOption: (option: string) => void;
};

const Select = ({
  options,
  selectedOption,
  changeSelectedOption,
}: SlectProps) => {
  const [isListOpen, setIsSelectOpen] = useState<boolean>(false);

  const onClickListOpen = () => {
    setIsSelectOpen((prevIsListOpen) => !prevIsListOpen);
  };

  return (
    <>
      <div className="relative">
        <div onClick={onClickListOpen} className="border-none py-2 px-4 w-full">
          <p>{selectedOption}</p>
        </div>
        <div
          className={`absolute mt-2 w-64 rounded-md shadow-lg bg-white ${
            isListOpen ? "" : "hidden"
          }`}
        >
          <ul className="shadow overflow-hidden border border-gray-100 rounded-md">
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                onClick={() => {
                  changeSelectedOption(option);
                  onClickListOpen();
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
