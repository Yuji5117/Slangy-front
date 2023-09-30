import { useState } from "react";

import { FavoriteCard } from "./FavoriteCard";
import { useFavorites } from "../hooks/useFavorites";

import { useToggle } from "@/hooks";

export const Favorites = () => {
  const [favorites, setFavorites, removeAllFavorites] = useFavorites();
  const [sortKey, setSortKey] = useState<string>("全ての言語");
  const [isOpen, setIsOpen] = useToggle();

  const options = ["全ての言語", "English", "Korean", "Spanish"].filter(
    (item) =>
      item === "全ての言語" ||
      favorites.some((favorite) => favorite.lang === item)
  );

  const filterdFavorites = favorites.filter(
    (favorite) => sortKey === "全ての言語" || favorite.lang === sortKey
  );

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="p-4">
        <h1 className="text-2xl font-medium pb-6">Favorites</h1>
        <div className="flex justify-between pb-3">
          <div className="relative">
            <div onClick={setIsOpen} className={`${isOpen ? "hidden" : ""} `}>
              {sortKey}
            </div>
            <div
              onClick={setIsOpen}
              className={`absolute w-48 bg-white ${isOpen ? "" : "hidden"}`}
            >
              <ul className="overflow-hidden border border-gray-100 rounded-md">
                {options.map((item) => (
                  <li
                    key={item}
                    onClick={() => setSortKey(item)}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className="text-red-500" onClick={removeAllFavorites}>
            全て削除
          </button>
        </div>
        {filterdFavorites.length ? (
          <div className="space-y-2">
            {filterdFavorites.map((favorite, index) => (
              <div className="border rounded-md" key={index}>
                <FavoriteCard
                  lang={favorite.lang}
                  sourceWord={favorite.sourceWord}
                  result={favorite.result}
                  setFavorites={setFavorites}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-md h-64 text-center left-auto leading-[16rem]">
            お気に入りがありません。
          </div>
        )}
      </div>
    </section>
  );
};
