import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/home/Home";
import AppLayout from "./layouts/AppLayout";
import AdminRoutes from "./pages/admin/AdminRoutes";
import TeacherRoutes from "./pages/teacher/TeacherRoutes";
import SchoolRoutes from "./pages/school/SchoolRoutes";
import StudentRoutes from "./pages/student/StudentRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/school/*" element={<SchoolRoutes />} />
      <Route path="/teacher/*" element={<TeacherRoutes />} />
      <Route path="/student/*" element={<StudentRoutes />} />

      {/* Catch all routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
