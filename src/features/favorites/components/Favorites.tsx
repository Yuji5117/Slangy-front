import { FavoriteCard } from "./FavoriteCard";
import { useFavorites } from "../hooks/useFavorites";

export const Favorites = () => {
  const [favorites, setFavorites, removeAllFavorites] = useFavorites();

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="p-4">
        <h1 className="text-2xl font-medium pb-6">Favorites</h1>
        <div className="flex justify-between pb-3">
          <div>全ての言語</div>
          <button className="text-red-500" onClick={removeAllFavorites}>
            全て削除
          </button>
        </div>
        {favorites.length ? (
          <div className="space-y-2">
            {favorites.map((favorite, index) => (
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
