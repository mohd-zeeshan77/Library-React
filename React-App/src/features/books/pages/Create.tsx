import { useCategoryQuery } from "../../categories/queries";
import Form from "../components/Form";
import { useNewBookMutation } from "../queries";

export default function Create() {
  const { mutateAsync } = useNewBookMutation();

  const { data: categories = [] } = useCategoryQuery();

  return (
    <div>
      <div className="h-5 flex justify-center">
        <h1 className="text-yellow-900 font-bold text-3xl">ADD NEW BOOK</h1>
      </div>
      <Form
        submitCaption="Create"
        onSubmit={async (book) => {
          const selectedCategory = categories.find(
            (c) => c.name === book.categoryName,
          );

          if (!selectedCategory) {
            throw new Error("Category not selected or invalid");
          }

          await mutateAsync({
            categoryId: selectedCategory.id,
            book,
          });
        }}
      />
    </div>
  );
}
