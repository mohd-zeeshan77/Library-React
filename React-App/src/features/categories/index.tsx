import { Navigate, Route, Routes } from "react-router";
import List from "./pages/List";
import Create from "./pages/Create";

export default function Categories() {
  return (
    <Routes>
      <Route index element={<Navigate to="list" />} />
      <Route path="list" element={<List />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
}
