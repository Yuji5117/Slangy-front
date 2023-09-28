import { AiOutlineCopy } from "react-icons/ai";

type CopyClipboard = {
  text: string;
};

export const CopyClipboard = ({ text }: CopyClipboard) => {
  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("コピーしました");
    } catch {
      alert("コピーに失敗しました");
    }
  };

  return (
    <div onClick={() => handleCopyToClipboard(text)}>
      <AiOutlineCopy size="1.5rem" />
    </div>
  );
};
