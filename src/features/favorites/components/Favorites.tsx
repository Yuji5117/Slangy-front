const Favorites = () => {
  const favorites = [
    {
      sourceWord: "slay",
      result:
        "「slay」はスラングで、「大成功する」「圧倒する」という意味を持っています。非スラングの文脈では、直訳すると「殺す」という意味になりますが、スラングとしては前述の解釈が一般的です。",
      lang: "English",
    },
    {
      sourceWord: "hell yeah",
      result:
        "「hell yeah」は、「もちろんだ」「全然OK」などという意味を持つスラングです。",
      lang: "English",
    },
    {
      sourceWord: "씨발",
      result:
        "「씨발」は非常に無礼で、韓国で最も強い罵倒語の一つで、「くそ」または「ちくしょう」といった類の意味があります。ただし、対話の文脈により意味が変わることがあります。 あくまでスラングなので、公の場では使わないよう注意してください。",
      lang: "Korean",
    },
  ];

  return (
    <section className="flex flex-col w-full max-w-md">
      <div className="p-4">
        <h1 className="text-2xl font-medium pb-8">Favorites</h1>
        <div className="space-y-2">
          {favorites.map((favorite, index) => (
            <div className="border rounded-md" key={index}>
              <div className="py-4 px-3 border-b align-middle">
                <p>{favorite.lang}</p>
              </div>
              <div className="">
                <div className="pt-5 pb-2">
                  <p className="text-lg mx-3 border-b border-black">
                    {favorite.sourceWord}
                  </p>
                </div>
                <div className="pt-2 pb-5">
                  <p className="text-lg px-3">{favorite.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
