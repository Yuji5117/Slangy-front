import React from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "@/lib/auth";

export type RequireAuthProps = { component: React.ReactNode };

export const RequireAuth = ({ component }: RequireAuthProps) => {
  const user = useUser();

  if (user.isLoading) {
    return <div>loading</div>;
  }

  if (user.error) {
    return <div>Error</div>;
  }

  if (user?.data?.message) {
    return <Navigate to={`/auth/login`} />;
  }

  return component;
};
