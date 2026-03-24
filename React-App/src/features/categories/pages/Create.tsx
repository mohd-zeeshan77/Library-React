import Form from "../components/Form";
import { useNewCategoryMutation } from "../queries";

export default function Create() {
  const { mutateAsync } = useNewCategoryMutation();
  return (
    <Form
      submitCaption="Create"
      onSubmit={async (category) => {
        await mutateAsync(category);
      }}
    />
  );
}
