import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/components/Layout";
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
]);
