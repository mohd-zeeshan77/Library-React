import { useEffect, useState } from "react";

interface IssuedBooksItems {
  id: number;
  userName: string;
  userType: string;
  bookName: string;
  dues: number;
  issuedDate: string;
  returnDate: string;
  renewStatus: boolean;
  renewDate: string;
  isReturned: boolean;
}
export default function IssuedBookList() {
  const [issueList, setIssueList] = useState<IssuedBooksItems[]>([]);
  useEffect(() => {
    fetch("http://localhost:5021/api/issued", {
      method: "GET",
      headers: {
        Origin: window.location.host,
        "Content-Type": "application/json; charset=uf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIssueList(data);
      });
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Issued Book List</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Id</th>
            <th className="py-2 px-4 border-b text-left">Member Name</th>
            <th className="py-2 px-4 border-b text-left">Member Type</th>
            <th className="py-2 px-4 border-b text-left">Book Name</th>
            <th className="py-2 px-4 border-b text-left">Issued Date</th>
            <th className="py-2 px-4 border-b text-left">Return Date</th>
            <th className="py-2 px-4 border-b text-left">Renew Status</th>
            <th className="py-2 px-4 border-b text-left">Renew Date</th>
            <th className="py-2 px-4 border-b text-left">Is Returned</th>
          </tr>
        </thead>
        <tbody>
          {issueList.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{b.id}</td>
              <td className="py-2 px-4 border-b">{b.userName}</td>
              <td className="py-2 px-4 border-b">{b.userType}</td>
              <td className="py-2 px-4 border-b">{b.bookName}</td>
              <td className="py-2 px-4 border-b">{b.issuedDate}</td>
              <td className="py-2 px-4 border-b">{b.returnDate}</td>
              <td className="py-2 px-4 border-b">{b.renewStatus}</td>
              <td className="py-2 px-4 border-b">{b.renewDate}</td>
              <td className="py-2 px-4 border-b">{b.isReturned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
