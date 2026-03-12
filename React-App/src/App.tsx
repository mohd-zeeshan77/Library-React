import { useCallback, useState } from "react";
import "./App.css";
import BookList from "./components/BookList";
import UserList from "./components/UserList";

export default function App() {
  const [booklist, setBookList] = useState(false);
  const [userlist, setUserList] = useState(false);
  const handleBookListClick = useCallback(() => {
    setBookList((prev) => !prev);
    if (userlist) setUserList(false);
  }, [userlist]);
  const handleUserListClick = useCallback(() => {
    setUserList((prev) => !prev);
    if (booklist) setBookList(false);
  }, [booklist]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">List of Books</h1>
      <div className="text-center mb-6">
        <button
          onClick={handleBookListClick}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {booklist ? "Hide Book List" : "Show Book List"}
        </button>
        <button
          onClick={handleUserListClick}
          className="bg-green-500 text-white px-6 py-2 ml-4 rounded-lg hover:bg-green-600 transition duration-200"
        >
          {userlist ? "Hide User List" : "Show User List"}
        </button>
      </div>
      <div className="mt-6">
        {booklist && <BookList />}
        {userlist && <UserList />}
      </div>
    </div>
  );
}
