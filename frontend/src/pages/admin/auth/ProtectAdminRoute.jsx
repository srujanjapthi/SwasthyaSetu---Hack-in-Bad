// import { useAdminAuth } from "@/api/AdminsApi";
import { useGetUser } from "@/api/AdminApi";
import Redirect from "@/pages/redirect/Redirect";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectAdminRoute() {
  const { isSignedIn, isLoading } = useGetUser();
  if (isLoading) return <Redirect />;
  return isSignedIn ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
