import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found/NotFound";
import Home from "./pages/home/Home";
import AppLayout from "./layouts/AppLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
