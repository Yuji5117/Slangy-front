type ResultType = {
  displayedResult: string;
};

export const DisplayResult = ({ displayedResult }: ResultType) => {
  return (
    <div className="mb-3">
      <p className="text-lg">{displayedResult}</p>
    </div>
  );
};
