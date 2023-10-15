import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 text-center py-4 lg:px-4">
      <div className="p-2 leading-none flex flex-col" role="alert">
        <div className="font-semibold text-xl">404 - Page not found</div>
        <div className="pt-7">
          <Link to={"/"}>ホーム画面へ</Link>
        </div>
      </div>
    </div>
  );
};
