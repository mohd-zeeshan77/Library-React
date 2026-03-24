import { Navigate, Route, Routes } from "react-router";
import List from "./pages/List";
import Create from "./pages/Create";

export default function Books() {
  return (
    <Routes>
      <Route index element={<Navigate to="list" />} />
      <Route path="list" element={<List />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
}
