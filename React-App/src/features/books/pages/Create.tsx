import Form from "../components/Form";
import { useNewBookMutation } from "../queries";

export default function Create() {
  const { mutateAsync } = useNewBookMutation();
  return (
    <Form
      submitCaption="Create"
      onSubmit={async (book) => {
        await mutateAsync(book);
      }}
    />
  );
}
