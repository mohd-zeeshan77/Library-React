import { Link, Route, Routes } from "react-router";
import "./App.css";
import BookList from "./features/books";
import Home from "./features/home";
import UserList from "./features/users";
import IssuedBookList from "./features/issuedbooks";

export default function App() {
  return (
    <div>
      <nav className="bg-linear-to-r from-blue-600 to-purple-800 p-4 text-white px-5 py-4 ">
        <div className="flex gap-5">
          <Link to="/books" className="text-white!">
            Books
          </Link>
          |
          <Link to="/users" className="text-white!">
            Users
          </Link>
          |
          <Link to="/issued" className="text-white!">
            Issued Books
          </Link>
        </div>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/issued" element={<IssuedBookList />} />
      </Routes>
    </div>
  );
}
