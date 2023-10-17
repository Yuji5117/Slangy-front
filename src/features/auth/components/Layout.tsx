import { Link } from "react-router-dom";

type LayoutProps = {
  authTitle: string;
  children: React.ReactNode;
};

export const Layout = ({ authTitle, children }: LayoutProps) => {
  return (
    <div>
      <header className="flex justify-between items-center p-4">
        <h1 className="font-bold text-2xl">
          <Link to="/">Slangy</Link>
        </h1>
      </header>
      <main>
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {authTitle}
            </h2>
            {children}
          </div>
        </div>
      </main>
      <footer className="py-4 text-center">
        <p className="text-sm">Slangy</p>
      </footer>
    </div>
  );
};
