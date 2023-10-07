import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <header className="flex justify-between items-center p-4">
        <h1 className="font-bold text-2xl">
          <Link to="/">Slangy</Link>
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="py-4 text-center">
        <p className="text-sm">Slangy</p>
      </footer>
    </div>
  );
};
