import { useEffect, useState } from "react";

export const useLocalStorage = (
  key: string
): [string, (value: string) => void, () => void] => {
  const [state, setState] = useState<string>("");

  useEffect(() => {
    const initializer = (key: string) => {
      const value = localStorage.getItem(key) || "";
      setState(value);
    };

    initializer(key);
  }, [key]);

  const set = (value: string) => {
    try {
      localStorage.setItem(key, value);
      setState(value);
    } catch {
      console.error("ローカルストレージへの保存が失敗しました。");
    }
  };

  const remove = () => {
    try {
      localStorage.removeItem(key);
      setState("");
    } catch {
      console.error(`ローカルストレージの${key}の値の削除に失敗しました。`);
    }
  };

  return [state, set, remove];
};
