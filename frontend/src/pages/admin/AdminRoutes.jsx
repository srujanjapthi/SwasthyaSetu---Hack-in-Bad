import { Route, Routes } from "react-router-dom";
import ProtectAdminRoute from "./auth/ProtectAdminRoute";
import AdminLogin from "./login/AdminLogin";
import AppLayout from "@/layouts/AppLayout";
import NotFound from "../not-found/NotFound";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<ProtectAdminRoute />}>
          <Route path="profile" element={<NotFound />} />
        </Route>
      </Route>

      <Route path="login" element={<AdminLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
