import { useCallback, useState } from "react";

export const useBoolean = (
  initalState: boolean
): readonly [boolean, (value: boolean) => void] => {
  const [state, setState] = useState<boolean>(initalState);

  const setBoolean = useCallback((value: boolean) => {
    setState(value);
  }, []);

  return [state, setBoolean] as const;
};
