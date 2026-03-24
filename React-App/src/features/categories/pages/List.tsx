import { Loader } from "../../../shared/components/loader";
import * as grid from "../../../shared/components/grid";
import { useCategoryQuery } from "../queries";
import { useNavigate } from "react-router-dom";

export default function List() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useCategoryQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return <div>No Catgory found.</div>;
  }

  return (
    <>
      <div>
        <button
          onClick={() => navigate("../create")}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-purple-700 transition-colors"
        >
          Add Category
        </button>
      </div>
      <grid.Grid
        data={data}
        columns={[
          {
            field: "name",
            header: "Name",
          },
        ]}
      />
    </>
  );
}
