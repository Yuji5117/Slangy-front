import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useUser } from "@/lib/auth";

export type RequireNoAuthProps = { component: React.ReactNode };

export const RequireNoAuth = ({ component }: RequireNoAuthProps) => {
  const user = useUser();
  const location = useLocation();

  if (user.isLoading) {
    return <div>loading</div>;
  }

  if (user.error) {
    return <div>Error</div>;
  }

  if (user?.data?.message) {
    return component;
  }

  return (
    <>
      <Navigate to={`/`} state={{ from: location }} replace />;
    </>
  );
};
