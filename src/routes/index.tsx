import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { RequireAuth } from "./RequireAuth";
import { RequireNoAuth } from "./RequireNoAuth";

import { MainLayout } from "@/components/Layout";
import { NotFound } from "@/components/NotFound";
import { Login } from "@/features/auth/routes/Login";
import { Register } from "@/features/auth/routes/Register";
import { Favorites } from "@/features/favorites";
import { Translation } from "@/features/translation/components/Translation";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Translation />} />
        <Route
          path="/favorites"
          element={<RequireAuth component={<Favorites />} />}
        />
      </Route>
      <Route path="/auth">
        <Route
          path={"/auth/register"}
          element={<RequireNoAuth component={<Register />} />}
        />
        <Route
          path={"/auth/login"}
          element={<RequireNoAuth component={<Login />} />}
        />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </>
  )
);
