import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import React, { useMemo } from "react";

export const AuthState: React.FC = React.memo(() => {
  const isAuthenticated = useIsAuthenticated();

  const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
});
