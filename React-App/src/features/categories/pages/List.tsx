import { Loader } from "../../../shared/components/loader";
import { useCategoryQuery } from "../queries";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/buttons";
import { Grid } from "../../../shared/components/grid";

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
    <div className="max-w-6x1 mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-yellow-900">
            Categories List
          </h2>
        </div>
        <Button
          caption="Add New Category"
          onClick={() => navigate("../create")}
        />
      </div>
      <div className="max-h-96 overflow-y-auto border border-gray-300 rounded">
        <Grid
          data={data}
          columns={[
            {
              field: "name",
              header: "Name",
            },
          ]}
        />
      </div>
    </div>
  );
}
