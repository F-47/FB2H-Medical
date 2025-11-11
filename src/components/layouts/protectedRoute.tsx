import { Navigate, Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getToken } from "@/services/auth";

export default function ProtectedRoute() {
  const token = getToken();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
    retry: false,
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
