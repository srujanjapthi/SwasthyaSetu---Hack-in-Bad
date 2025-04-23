import { Route, Routes } from "react-router-dom";
import ProtectTeacherRoute from "./auth/ProtectTeacherRoute";
import TeacherLogin from "./login/TeacherLogin";
import AppLayout from "@/layouts/AppLayout";
import NotFound from "../not-found/NotFound";

export default function TeacherRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<ProtectTeacherRoute />}>
          <Route path="profile" element={<NotFound />} />
        </Route>
      </Route>

      <Route path="login" element={<TeacherLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
