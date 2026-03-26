import Form from "../components/Form";
import { useNewCategoryMutation } from "../queries";

export default function Create() {
  const { mutateAsync } = useNewCategoryMutation();
  return (
    <div>
      <div className="h-5 flex justify-center">
        <h1 className="text-yellow-900 font-bold text-3xl">ADD NEW CATEGORY</h1>
      </div>
      <Form
        submitCaption="Create"
        onSubmit={async (category) => {
          await mutateAsync(category);
        }}
      />
    </div>
  );
}
