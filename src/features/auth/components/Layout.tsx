import { Link } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header className="flex justify-between items-center p-4">
        <h1 className="font-bold text-2xl">
          <Link to="/">Slangy</Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer className="py-4 text-center">
        <p className="text-sm">Slangy</p>
      </footer>
    </div>
  );
};
