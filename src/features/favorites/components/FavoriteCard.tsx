type FavoriteCardProps = {
  lang: string;
  sourceWord: string;
  result: string;
};

export const FavoriteCard = ({
  lang,
  sourceWord,
  result,
}: FavoriteCardProps) => {
  return (
    <>
      <div className="py-4 px-3 border-b align-middle">
        <p>{lang}</p>
      </div>
      <div className="">
        <div className="pt-5 pb-2">
          <p className="text-lg mx-3 border-b border-black">{sourceWord}</p>
        </div>
        <div className="pt-2 pb-5">
          <p className="text-lg px-3">{result}</p>
        </div>
      </div>
    </>
  );
};
