import { ChangeEventHandler, useEffect, useRef } from "react";

type AutoResizingTextarea = {
  value: string;
  onChangeHandler: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  placeholder?: string;
};

const AutoResizingTextarea = ({
  value,
  onChangeHandler,
  className = "w-full p-2 border-none rounded-md outline-none",
  placeholder = "スラングを入力してください...",
}: AutoResizingTextarea) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, []);

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <textarea
      className={className}
      placeholder={placeholder}
      value={value}
      ref={textAreaRef}
      onChange={(e) => {
        adjustTextAreaHeight();
        onChangeHandler(e);
      }}
      autoFocus={false}
      rows={1}
    ></textarea>
  );
};

export default AutoResizingTextarea;
