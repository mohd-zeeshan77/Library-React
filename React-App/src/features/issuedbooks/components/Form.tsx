import { useNavigate } from "react-router";
import { useStateForm } from "./state.form";
import { Button } from "../../../shared/components/buttons";
import { useUsersQuery } from "../../users/queries";
import { useBooksQuery } from "../../books/queries";

interface FormProps {
  onSubmit: (
    p: Master.IssuedForm & { userId: number; bookId: number },
  ) => Promise<void>;
  onLoad?: () => Promise<Master.IssuedItem>;
  submitCaption: string;
}

export default function Form({ onLoad, onSubmit, submitCaption }: FormProps) {
  const { get, handleSubmit, submitting, errors } = useStateForm(onLoad);
  const navigate = useNavigate();

  const { data: users = [], isLoading: loadingUsers } = useUsersQuery();
  const { data: books = [], isLoading: loadingBooks } = useBooksQuery();

  return (
    <div className="w-full max-w-xs pt-5 pb-5">
      <form
        className="bg-yellow-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-yellow-900"
        onSubmit={handleSubmit(async (data) => {
          const selectedUser = users.find((c) => c.name === data.userName);
          const selectedBook = books.find((c) => c.name === data.bookName);
          if (!selectedUser) {
            throw new Error("Please select a valid user");
          }
          if (!selectedBook) {
            throw new Error("Please select a valid book");
          }

          await onSubmit({
            ...data,
            userId: selectedUser.id,
            bookId: selectedBook.id,
          });
          navigate("../list"); // redirect after submit
        })}
      >
        {/* Users */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Members
          </label>
          {loadingUsers ? (
            <div>Loading Members...</div>
          ) : (
            <select
              {...get("userName").control.register(get("userName").name)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Members</option>
              {users.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          {errors.userName && (
            <div className="text-red-500">{errors.userName.message}</div>
          )}
        </div>

        {/* Books */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Books
          </label>
          {loadingBooks ? (
            <div>Loading Books...</div>
          ) : (
            <select
              {...get("bookName").control.register(get("bookName").name)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Category</option>
              {books.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          {errors.bookName && (
            <div className="text-red-500">{errors.bookName.message}</div>
          )}
        </div>

        {/* Dues */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Dues
          </label>
          <input
            type="number"
            step="0.01" // allows 2 decimal places
            {...get("dues").control.register(get("dues").name)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.dues && (
            <div className="text-red-500">{errors.dues.message}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <Button
            caption="Back"
            type="button"
            onClick={() => navigate("../list")}
          />
          <Button caption={submitCaption} type="submit" disabled={submitting} />
        </div>
      </form>
    </div>
  );
}
