import { Navigate, Route, Routes } from "react-router";
import List from "./pages/List";
import Create from "./pages/Create";
import MemberType from "./pages/MemberType";

export default function Users() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Routes>
        <Route index element={<Navigate to="list" />} />
        <Route path="list" element={<List />} />
        <Route path="create" element={<Create />} />
        <Route path="membertype/:id" element={<MemberType />} />
      </Routes>
    </div>
  );
}
