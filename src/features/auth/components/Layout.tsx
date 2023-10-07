import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>ヘッダー</header>
      <main>
        <Outlet />
      </main>
      <footer>フッター</footer>
    </>
  );
};
