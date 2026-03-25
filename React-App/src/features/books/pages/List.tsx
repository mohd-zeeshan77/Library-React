import { Loader } from "../../../shared/components/loader";
import * as grid from "../../../shared/components/grid";
import { useBooksQuery } from "../queries";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/buttons";

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
    <div className="max-w-6x1 mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-yellow-900"> Books</h2>
        </div>
        <Button caption="Add New Book" onClick={() => navigate("../create")} />
      </div>
      <div>
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
      </div>
    </div>
  );
}
