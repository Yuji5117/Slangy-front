import { FavoriteCard } from "./FavoriteCard";

export const Favorites = () => {
  const favorites = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    const value = localStorage.getItem(key);
    if (!value) continue;

    const { result, lang }: { result: string; lang: string } =
      JSON.parse(value);

    favorites.push({
      sourceWord: key,
      result,
      lang,
    });
  }

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="p-4">
        <h1 className="text-2xl font-medium pb-8">Favorites</h1>
        {favorites.length ? (
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
        ) : (
          <div className="border rounded-md h-64 text-center left-auto leading-[16rem]">
            お気に入りがありません。
          </div>
        )}
      </div>
    </section>
  );
};
