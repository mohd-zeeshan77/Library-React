import { useNavigate } from "react-router";
import { useCategoriesForBooksQuery } from "../queries";
import { useStateForm } from "./state.form";

interface FormProps {
  onSubmit: (p: Master.BookForm & { categoryId: number }) => Promise<void>;
  onLoad?: () => Promise<Master.BookItem>;
  submitCaption: string;
}

export default function Form({ onLoad, onSubmit, submitCaption }: FormProps) {
  const { get, handleSubmit, submitting, errors } = useStateForm(onLoad);
  const navigate = useNavigate();

  const { data: categories = [], isLoading: loadingCategories } =
    useCategoriesForBooksQuery();

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            {...get("name").control.register(get("name").name)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Author Name
          </label>
          <input
            type="text"
            {...get("authorName").control.register(get("authorName").name)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.authorName && (
            <div className="text-red-500">{errors.authorName.message}</div>
          )}
        </div>

        {/* Publisher */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Publisher
          </label>
          <input
            type="text"
            {...get("publisher").control.register(get("publisher").name)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.publisher && (
            <div className="text-red-500">{errors.publisher.message}</div>
          )}
        </div>

        {/* Edition */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Edition
          </label>
          <input
            type="text"
            {...get("edition").control.register(get("edition").name)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.edition && (
            <div className="text-red-500">{errors.edition.message}</div>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            {...get("price").control.register(get("price").name)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.price && (
            <div className="text-red-500">{errors.price.message}</div>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          {loadingCategories ? (
            <div>Loading categories...</div>
          ) : (
            <select
              {...get("categoryName").control.register(
                get("categoryName").name,
              )}
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
          {errors.categoryName && (
            <div className="text-red-500">{errors.categoryName.message}</div>
          )}
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stock
          </label>
          <input
            type="number"
            {...get("stock").control.register(get("stock").name)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.stock && (
            <div className="text-red-500">{errors.stock.message}</div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {submitCaption}
        </button>
      </form>
    </div>
  );
}
