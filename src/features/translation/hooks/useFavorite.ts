import { useLocalStorage } from "@/hooks";

export const useFavorite = (key: string) => {
  const {
    state,
    set: setToLocalStorage,
    remove: removeFromLocalStorage,
  } = useLocalStorage(key);

  console.log({ state });

  const favoriteResult: string = state ? JSON.parse(state).result : "";

  const addToFavorite = (result: string) => {
    setToLocalStorage(result);
  };

  const removeToFavorite = () => {
    removeFromLocalStorage();
  };

  return { favoriteResult, addToFavorite, removeToFavorite };
};
