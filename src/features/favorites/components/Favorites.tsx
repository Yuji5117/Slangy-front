import { FavoriteCard } from "./FavoriteCard";

export const Favorites = () => {
  const favorites = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      if (value) {
        favorites.push({
          sourceWord: key,
          result: value,
          lang: "English",
        });
      }
    }
  }

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="p-4">
        <h1 className="text-2xl font-medium pb-8">Favorites</h1>
        <div className="space-y-2">
          {favorites.map((favorite, index) => (
            <div className="border rounded-md" key={index}>
              <FavoriteCard
                lang={favorite.lang}
                sourceWord={favorite.sourceWord}
                result={favorite.result}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
