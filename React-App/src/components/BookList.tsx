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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Book List</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Id</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Author Name</th>
            <th className="py-2 px-4 border-b text-left">Publisher</th>
            <th className="py-2 px-4 border-b text-left">Edition</th>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Stock</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{b.id}</td>
              <td className="py-2 px-4 border-b">{b.name}</td>
              <td className="py-2 px-4 border-b">{b.authorName}</td>
              <td className="py-2 px-4 border-b">{b.publisher}</td>
              <td className="py-2 px-4 border-b">{b.edition}</td>
              <td className="py-2 px-4 border-b">{b.categoryName}</td>
              <td className="py-2 px-4 border-b">{b.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
