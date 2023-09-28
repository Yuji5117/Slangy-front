type ToggleSwitchButtonProps = {
  on: boolean;
  toggle: () => void;
};

const ToggleSwitchButton = ({ on, toggle }: ToggleSwitchButtonProps) => {
  return (
    <>
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className="hidden"
        checked={on}
        onChange={toggle}
      />
      <label
        htmlFor="toggle"
        className={`box-content overflow-hidden border block h-6 rounded-full cursor-pointer ${
          on ? "bg-blue-500" : "bg-gray-100"
        }`}
      >
        <span
          className={`absolute block w-6 h-6 bg-white rounded-full shadow transition-transform transform ${
            on ? "translate-x-6" : ""
          }`}
        ></span>
      </label>
    </>
  );
};

export default ToggleSwitchButton;
