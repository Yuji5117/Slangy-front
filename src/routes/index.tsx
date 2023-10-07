import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/components/Layout";
import { Layout as AuthLayout } from "@/features/auth/components";
import { Login } from "@/features/auth/components/Login";
import { Register } from "@/features/auth/components/Register";
import { Favorites } from "@/features/favorites";
import { Translation } from "@/features/translation/components/Translation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Translation /> },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "/auth/*",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
