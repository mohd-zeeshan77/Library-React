import { useEffect, useState } from "react";
import { ApiService } from "../../services";
import { Loader } from "../../shared/components/loader";

interface IssuedItems {
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
  const [loading, setLoading] = useState(true);
  const [issueList, setIssuedList] = useState<IssuedItems[]>([]);
  useEffect(() => {
    ApiService.get<IssuedItems[]>("issued")
      .then(setIssuedList)
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (issueList.length === 0) {
    return <div>No issued books found.</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Issued Book List</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-linear-to-r from-blue-600 to-purple-800 p-4 px-4">
          <tr>
            <th className="py-2 px-4 border-b text-center">Id</th>
            <th className="py-2 px-4 border-b text-center">Member Name</th>
            <th className="py-2 px-4 border-b text-center">Member Type</th>
            <th className="py-2 px-4 border-b text-center">Book Name</th>
            <th className="py-2 px-4 border-b text-center">Issued Date</th>
            <th className="py-2 px-4 border-b text-center">Return Date</th>
            <th className="py-2 px-4 border-b text-center">Renew Status</th>
            <th className="py-2 px-4 border-b text-center">Renew Date</th>
            <th className="py-2 px-4 border-b text-center">Is Returned</th>
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
              <td className="py-2 px-4 border-b">
                {b.renewStatus ? "Renewed" : "Not Renewed"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {b.renewDate ? b.renewDate : "-"}
              </td>
              <td className="py-2 px-4 border-b">
                {b.isReturned ? "Returned" : "Not Returned"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
