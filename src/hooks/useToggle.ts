import { useCallback, useState } from "react";

export const useToggle = (
  initalState = false
): readonly [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initalState);

  const toggle = useCallback(() => {
    setState((prevIsListOpen) => !prevIsListOpen);
  }, []);

  return [state, toggle] as const;
};
