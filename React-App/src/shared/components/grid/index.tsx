import { nanoid } from "nanoid";
import Button from "../buttons/Button";

interface Column<T> {
  field?: keyof T;
  header?: string;
  onClick?: (o: T) => void;
  buttonCaption?: string;
}
interface GridProps<T> {
  data: T[];
  columns: Column<T>[];
}
export function Grid<T>(props: GridProps<T>) {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-linear-to-r from-blue-600 to-purple-800 p-4 px-4">
          <tr>
            {props.columns.map((c) => (
              <th key={nanoid()} className="py-2 px-4 border-b text-left">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => {
            return (
              <tr key={nanoid()} className="hover:bg-gray-50">
                {props.columns.map((c) => {
                  if (c.field) {
                    const v = item[c.field as keyof T];
                    return (
                      <td key={nanoid()} className="py-2 px-4 border-b">
                        {v as string}
                      </td>
                    );
                  }
                  if (c.onClick) {
                    return (
                      <td key={nanoid()} className="py-2 px-4 border-b">
                        <Button
                          caption={c.buttonCaption ?? "Click"}
                          type="button"
                          onClick={() => c.onClick?.(item)}
                        ></Button>
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
