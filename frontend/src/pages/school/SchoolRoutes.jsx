import { Route, Routes } from "react-router-dom";
import ProtectSchoolRoute from "./auth/ProtectSchoolRoute";
import SchoolLogin from "./login/SchoolLogin";
import AppLayout from "@/layouts/AppLayout";
import NotFound from "../not-found/NotFound";

export default function SchoolRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<ProtectSchoolRoute />}>
          <Route path="profile" element={<NotFound />} />
        </Route>
      </Route>

      <Route path="login" element={<SchoolLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
