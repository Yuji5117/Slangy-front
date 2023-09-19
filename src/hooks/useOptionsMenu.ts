import { useState } from "react";

export const useOptionsMenu = (initalState = false): [boolean, () => void] => {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] =
    useState<boolean>(initalState);

  const toggleOptionsMenu = () => {
    setIsOptionsMenuOpen((prevIsListOpen) => !prevIsListOpen);
  };

  return [isOptionsMenuOpen, toggleOptionsMenu];
};
