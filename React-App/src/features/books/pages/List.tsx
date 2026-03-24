import { Loader } from "../../../shared/components/loader";
import * as grid from "../../../shared/components/grid";
import { useBooksQuery } from "../queries";
import { useNavigate } from "react-router-dom";

export default function List() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useBooksQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return <div>No Books found.</div>;
  }

  return (
    <>
      <div>
        <button
          onClick={() => navigate("../create")}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-purple-700 transition-colors"
        >
          Add Book
        </button>
      </div>
      <grid.Grid
        data={data}
        columns={[
          {
            field: "name",
            header: "Name",
          },
          {
            field: "authorName",
            header: "Author Name",
          },
          {
            field: "publisher",
            header: "Publisher",
          },
          {
            field: "edition",
            header: "Edition",
          },
          {
            field: "price",
            header: "Price",
          },
          {
            field: "categoryName",
            header: "Category Name",
          },
          {
            field: "stock",
            header: "Stock",
          },
        ]}
      />
    </>
  );
}
