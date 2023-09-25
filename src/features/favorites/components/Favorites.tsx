const Favorites = () => {
  const favorites = [
    { sourceWord: "slay", result: "XXXXXXXXXXXXXXXXXXXXXXXX" },
    { sourceWord: "hell yeah", result: "XXXXXXXXXXXXXXXXXXXXXXXX" },
    { sourceWord: "yep", result: "XXXXXXXXXXXXXXXXXXXXXXXX" },
  ];

  return (
    <section className="flex flex-col w-full max-w-md">
      <h1>Favorites List</h1>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            <p>{favorite.sourceWord}</p>
            <p>{favorite.result}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Favorites;
