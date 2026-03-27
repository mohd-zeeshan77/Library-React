import { Loader } from "../../../shared/components/loader";
import * as grid from "../../../shared/components/grid";
import { useUsersQuery } from "../queries";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/buttons";

export default function List() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useUsersQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return <div>No Users found.</div>;
  }

  return (
    <div className="max-w-6x1 mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-yellow-900"> Users List</h2>
        </div>
        <Button caption="Add New User" onClick={() => navigate("../create")} />
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
              field: "typeName",
              header: "Member Type",
            },
            {
              header: "Change Member Type",
              buttonCaption: "Change Type",
              onClick: (row: Master.UserItems) => {
                navigate(`../membertype/${row.id}`);
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
