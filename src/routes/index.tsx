import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import { MainLayout } from "@/components/Layout";
import { NotFound } from "@/components/NotFound";
import { Login } from "@/features/auth/routes/Login";
import { Register } from "@/features/auth/routes/Register";
import { Favorites } from "@/features/favorites";
import { Translation } from "@/features/translation/components/Translation";
import { AuthLoader } from "@/lib/auth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Translation />} />
        <Route
          path="/favorites"
          element={
            <AuthLoader
              renderLoading={() => <div>Loading ...</div>}
              renderUnauthenticated={() => (
                <Navigate to={"/auth/login"} state={"/favorites"} />
              )}
            >
              <Favorites />
            </AuthLoader>
          }
        />
      </Route>
      <Route >
        <Route path={"/auth/register"} element={<Register />} />
        <Route path={"/auth/login"} element={<Login />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </>
  )
);
