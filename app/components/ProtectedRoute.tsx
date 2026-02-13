import type { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { isAdmin, isAuthenticated } from "~/utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const admin = isAdmin();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (adminOnly && !admin) {
      navigate("/home", { replace: true });
    }
  }, [adminOnly, admin, authenticated, navigate]);

  if (!authenticated) {
    return null;
  }

  if (adminOnly && !admin) {
    return null;
  }

  return <>{children}</>;
}
