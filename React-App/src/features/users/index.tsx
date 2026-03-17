import { useEffect, useState } from "react";
import { Loader } from "../../shared/components/loader";
import { ApiService } from "../../services";

interface UserItems {
  id: number;
  name: string;
  typeName: string;
}
export default function UserList() {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState<UserItems[]>([]);
  useEffect(() => {
    ApiService.get<UserItems[]>("users")
      .then(setUserList)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (userList.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">User List</h1>
      <table className="min-w-full table-auto border-purple-400">
        <thead className="bg-linear-to-r from-blue-600 to-purple-800 p-4 px-4">
          <tr>
            <th className="py-2 px-4 border-purple-400 text-left">Id</th>
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
