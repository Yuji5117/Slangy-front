import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { ProtectedRoute } from "./protectedRoute";

import { MainLayout } from "@/components/Layout";
import { NotFound } from "@/components/NotFound";
import { Layout as AuthLayout } from "@/features/auth/components";
import { Login } from "@/features/auth/components/Login";
import { Register } from "@/features/auth/components/Register";
import { Favorites } from "@/features/favorites";
import { Translation } from "@/features/translation/components/Translation";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Translation />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path={"/auth"} element={<AuthLayout />}>
        <Route path={"/auth/register"} element={<Register />} />
        <Route path={"/auth/login"} element={<Login />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </>
  )
);
