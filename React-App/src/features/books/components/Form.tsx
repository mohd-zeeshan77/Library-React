import { useNavigate } from "react-router";
import { useStateForm } from "./state.form";
import { Button } from "../../../shared/components/buttons";
import { useCategoryQuery } from "../../categories/queries";
import TextBox from "../../../shared/components/forms/TextBox";
import { Controller } from "react-hook-form";

interface FormProps {
  onSubmit: (p: Master.BookForm & { categoryId: number }) => Promise<void>;
  onLoad?: () => Promise<Master.BookItem>;
  submitCaption: string;
}

export default function Form({ onLoad, onSubmit, submitCaption }: FormProps) {
  const { get, handleSubmit, submitting, errors } = useStateForm(onLoad);
  const navigate = useNavigate();

  const { data: categories = [], isLoading: loadingCategories } =
    useCategoryQuery();

  return (
    <div className="w-full max-w-xs pt-5 pb-5">
      <form
        className="bg-yellow-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-yellow-900"
        onSubmit={handleSubmit(async (data) => {
          const selectedCategory = categories.find(
            (c) => c.name === data.categoryName,
          );
          if (!selectedCategory) {
            throw new Error("Please select a valid category");
          }
          await onSubmit({ ...data, categoryId: selectedCategory.id });
          navigate("../list");
        })}
      >
        <TextBox label="Name" {...get("name")} />

        <TextBox label="Author Name" {...get("authorName")} />

        <TextBox label="Publisher" {...get("publisher")} />

        <TextBox label="Edition" {...get("edition")} />

        <TextBox label="Price" {...get("price")} />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>

          {loadingCategories ? (
            <div>Loading categories...</div>
          ) : (
            <Controller
              control={get("categoryName").control}
              name={get("categoryName").name}
              render={({ field }) => (
                <select
                  {...field}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            />
          )}

          {errors.categoryName && (
            <div className="text-red-500">{errors.categoryName.message}</div>
          )}
        </div>

        <TextBox label="Stock" {...get("stock")} />

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
