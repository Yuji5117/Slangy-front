import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useUser } from "@/lib/auth";

export type RequireAuthProps = { component: React.ReactNode };

export const RequireAuth = ({ component }: RequireAuthProps) => {
  const user = useUser();
  const location = useLocation();
  const locationState = location.state ?? "/";

  if (user.isLoading) {
    return <div></div>;
  }

  if (user?.data?.message) {
    return <Navigate to={`/auth/login`} state={locationState} replace />;
  }

  return component;
};
