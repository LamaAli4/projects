import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
