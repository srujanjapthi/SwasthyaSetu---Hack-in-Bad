// import { useAdminAuth } from "@/api/AdminsApi";
import Redirect from "@/pages/redirect/Redirect";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectStudentRoute() {
  const { isSignedIn, isLoading } = { isSignedIn: true, isLoading: false };
  if (isLoading) return <Redirect />;
  return isSignedIn ? <Outlet /> : <Navigate to="/student/login" replace />;
}
