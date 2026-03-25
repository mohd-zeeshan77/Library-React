import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/components/buttons";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-yellow-100 px-5 py-10">
      <h1 className="text-4xl font-bold text-yellow-900 mb-6 text-center">
        Welcome to My Library
      </h1>
      <p className="text-yellow-900 mb-10 text-center max-w-xl">
        Manage your books, users, issued books, and categories efficiently. Use
        the buttons below to navigate through your library system.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <Button caption="Books" onClick={() => navigate("/books")} />
        <Button caption="Issued Books" onClick={() => navigate("/issued")} />
        <Button caption="Users" onClick={() => navigate("/users")} />
        <Button caption="Categories" onClick={() => navigate("/categories")} />
      </div>
    </div>
  );
}
