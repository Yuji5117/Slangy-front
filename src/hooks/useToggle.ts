import { useCallback, useState } from "react";

export const useToggle = (
  initalState = false
): readonly [boolean, () => void] => {
  const [state, setIsOptionsMenuOpen] = useState<boolean>(initalState);

  const toggle = useCallback(() => {
    setIsOptionsMenuOpen((prevIsListOpen) => !prevIsListOpen);
  }, []);

  return [state, toggle] as const;
};
