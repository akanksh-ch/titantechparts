import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { isAdmin, isAuthenticated } from "~/utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
