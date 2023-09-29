import { useEffect, useState } from "react";

export const useLocalStorage = (key: string) => {
  const [state, setState] = useState<string>("");

  useEffect(() => {
    const initializer = (key: string) => {
      const value = localStorage.getItem(key) || "";
      setState(value);
    };

    initializer(key);
  }, [key]);

  return [state];
};
