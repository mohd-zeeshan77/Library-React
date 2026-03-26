import { Navigate, Route, Routes } from "react-router-dom";
import List from "./pages/List";
import Create from "./pages/Create";
import Return from "./pages/Return";
import Renew from "./pages/Renew";

export default function IssuedBooks() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Routes>
        <Route index element={<Navigate to="list" />} />
        <Route path="list" element={<List />} />
        <Route path="create" element={<Create />} />
        <Route path="return/:bookId/:userId" element={<Return />} />
        <Route path="renew/:bookId/:userId" element={<Renew />} />
      </Routes>
    </div>
  );
}
