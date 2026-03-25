import Form from "../components/Form";
import { useNewBookMutation, useCategoriesForBooksQuery } from "../queries";

export default function Create() {
  const { mutateAsync } = useNewBookMutation();

  const { data: categories = [] } = useCategoriesForBooksQuery();

  return (
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
  );
}
