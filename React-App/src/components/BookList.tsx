import { useEffect, useState } from "react";

interface BookItem {
  id: number;
  name: string;
  authorName: string;
  publisher: string;
  edition: string;
  price: number;
  categoryName: string;
  stock: number;
}
export default function BookList() {
  const [bookList, setBookList] = useState<BookItem[]>([]);
  useEffect(() => {
    fetch("http://localhost:5021/api/books", {
      method: "GET",
      headers: {
        Origin: window.location.host,
        "Content-Type": "application/json; charset=uf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBookList(data);
      });
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Author Name</th>
          <th>Publisher</th>
          <th>Edition</th>
          <th>Category</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {bookList.map((b) => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td>{b.name}</td>
            <td>{b.authorName}</td>
            <td>{b.publisher}</td>
            <td>{b.edition}</td>
            <td>{b.categoryName}</td>
            <td>{b.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
