import { Route, Routes } from "react-router-dom";
import ProtectStudentRoute from "./auth/ProtectStudentRoute";
import StudentLogin from "./login/StudentLogin";
import AppLayout from "@/layouts/AppLayout";
import NotFound from "../not-found/NotFound";
import StudentDashboard from "./dashboard/StudentDashboard";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<ProtectStudentRoute />}>
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>
      </Route>

      <Route path="login" element={<StudentLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
