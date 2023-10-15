import React from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "@/lib/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useUser({});

  if (user.isLoading) {
    return <div>loading</div>;
  }

  if (user.error) {
    return <div>Error</div>;
  }

  if (user.data.message) {
    return <Navigate to={`/auth/login`} />;
  }

  return <div>{children}</div>;
};
