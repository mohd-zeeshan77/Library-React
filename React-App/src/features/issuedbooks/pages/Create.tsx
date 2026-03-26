import { useBooksQuery } from "../../books/queries";
import { useUsersQuery } from "../../users/queries";
import Form from "../components/Form";
import { useNewIssuedMutation } from "../queries";

export default function Create() {
  const { mutateAsync } = useNewIssuedMutation();
  const { data: users = [] } = useUsersQuery();
  const { data: books = [] } = useBooksQuery();

  return (
    <div>
      <div className="h-5 flex justify-center">
        <h1 className="text-yellow-900 font-bold text-3xl">ISSUE NEW BOOK</h1>
      </div>
      <Form
        submitCaption="Create"
        onSubmit={async (issued) => {
          const selectedUser = users.find((c) => c.name === issued.userName);
          const selectedBook = books.find((c) => c.name === issued.bookName);

          if (!selectedUser) {
            throw new Error("User not selected or invalid");
          }
          if (!selectedBook) {
            throw new Error("Book not selected or invalid");
          }

          await mutateAsync({
            userId: selectedUser.id,
            bookId: selectedBook.id,
            dues: issued.dues,
          });
        }}
      />
    </div>
  );
}
