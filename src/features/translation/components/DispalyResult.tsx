type DisplayResultType = {
  displayedResult: string;
};

export const DisplayResult = ({ displayedResult }: DisplayResultType) => {
  return (
    <div className="mb-3">
      <p className="text-lg">{displayedResult}</p>
    </div>
  );
};
