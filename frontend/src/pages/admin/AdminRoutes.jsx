import { Route, Routes } from "react-router-dom";
import ProtectAdminRoute from "./auth/ProtectAdminRoute";
import AdminLogin from "./login/AdminLogin";
import AppLayout from "@/layouts/AppLayout";
import NotFound from "../not-found/NotFound";
import AdminDashboard from "./dashboard/AdminDashboard";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<ProtectAdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="login" element={<AdminLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
