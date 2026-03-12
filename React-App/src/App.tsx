import { useCallback, useState } from "react";
import "./App.css";
import BookList from "./components/BookList";

export default function App() {
  const [value, setValue] = useState(false);
  const handleClick = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return (
    <div className="css-class">
      <h1>List of Books</h1>
      <h1>{value}</h1>
      <button onClick={handleClick}>Click</button>
      {value && <BookList />}
    </div>
  );
}
