import { useEffect, useState } from "react";

interface UserItems {
  id: number;
  name: string;
  typeName: string;
}
export default function UserList() {
  const [userList, setUserList] = useState<UserItems[]>([]);
  useEffect(() => {
    fetch("http://localhost:5021/api/users", {
      method: "GET",
      headers: {
        Origin: window.location.host,
        "Content-Type": "application/json; charset=uf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
      });
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">User List</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Id</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Member Type</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{u.id}</td>
              <td className="py-2 px-4 border-b">{u.name}</td>
              <td className="py-2 px-4 border-b">{u.typeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
