import { Link, Route, Routes } from "react-router";
import "./App.css";
import BookList from "./features/books";
import Home from "./features/home";
import UserList from "./features/users";
import IssuedBookList from "./features/issuedbooks";
import CategoryList from "./features/categories";

export default function App() {
  return (
    <div className="min-h-screen bg-yellow-100">
      <nav className="bg-linear-to-r from-yellow-900 to-yellow-800 shadow-md">
        <div className="max-w-7xl px-5 py-4 flex gap-3 flex-wrap justify-between">
          <div className="max-w-7xl px-5 py-4 flex gap-3 flex-wrap">
            <Link to="/" className="text-white!">
              Home
            </Link>
          </div>

          <div className="max-w-7xl px-5 py-4 flex gap-5 flex-wrap">
            <Link to="/books" className="text-white!">
              Books
            </Link>

            <Link to="/users" className="text-white!">
              Users
            </Link>

            <Link to="/categories" className="text-white!">
              Categories List
            </Link>

            <Link to="/issued" className="text-white!">
              Issued Books
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/books/*" element={<BookList />} />
        <Route path="/users/*" element={<UserList />} />
        <Route path="/issued/*" element={<IssuedBookList />} />
        <Route path="/categories/*" element={<CategoryList />} />
      </Routes>
    </div>
  );
}
