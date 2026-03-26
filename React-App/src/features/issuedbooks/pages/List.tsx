import { Loader } from "../../../shared/components/loader";
import * as grid from "../../../shared/components/grid";
import { useIssuedQuery } from "../queries";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/buttons";

function formatDate(dateString: string | null) {
  if (!dateString) return "-";
  const date = new Date(dateString + "T00:00:00");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
export default function List() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useIssuedQuery();
  const formattedData = data.map((item: Master.IssuedItem) => ({
    ...item,
    issuedDate: formatDate(item.issuedDate),
    returnDate: formatDate(item.returnDate),
    renewDate: formatDate(item.renewDate),
    renewStatus:
      item.renewStatus === null
        ? "-"
        : item.renewStatus
          ? "Renewed"
          : "Not Renewed",

    isReturned:
      item.isReturned === null
        ? "-"
        : item.isReturned
          ? "Returned"
          : "Not Returned",

    dues: item.dues ?? "-",
  }));

  if (isLoading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return <div>No Issued Books found.</div>;
  }

  return (
    <div className="max-w-6x1 mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-yellow-900"> Issued Books</h2>
        </div>
        <Button
          caption="Add New Issued Book"
          onClick={() => navigate("../create")}
        />
      </div>
      <div>
        <grid.Grid
          data={formattedData}
          columns={[
            {
              field: "id",
              header: "ID",
            },
            {
              field: "userName",
              header: "Member Name",
            },
            {
              field: "userType",
              header: "Membership Type",
            },
            {
              field: "bookName",
              header: "Book Name",
            },
            {
              field: "issuedDate",
              header: "Issued Date",
            },
            {
              field: "returnDate",
              header: "Return Date",
            },
            {
              field: "renewStatus",
              header: "Renew Status",
            },
            {
              field: "renewDate",
              header: "Renew Date",
            },
            {
              field: "isReturned",
              header: "Returned Status",
            },
            {
              field: "dues",
              header: "Dues Remain",
            },
          ]}
        />
      </div>
    </div>
  );
}
