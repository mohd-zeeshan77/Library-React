import { useNavigate } from "react-router";
import { useMembersQuery } from "../queries";
import { useStateForm } from "./state.form";
import { Button } from "../../../shared/components/buttons";
import TextBox from "../../../shared/components/forms/TextBox";

interface FormProps {
  onSubmit: (p: Master.UserForm & { typeId: number }) => Promise<void>;
  onLoad?: () => Promise<Master.UserItems>;
  submitCaption: string;
}

export default function Form({ onLoad, onSubmit, submitCaption }: FormProps) {
  const { get, handleSubmit, submitting, errors } = useStateForm(onLoad);
  const navigate = useNavigate();

  const { data: members = [], isLoading: loadingMembers } = useMembersQuery();

  return (
    <div className="w-full max-w-xs pt-5 pb-5">
      <form
        className="bg-yellow-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-yellow-900"
        onSubmit={handleSubmit(async (data) => {
          const selectedMember = members.find((c) => c.name === data.typeName);
          if (!selectedMember) {
            throw new Error("Please select a valid Member Type");
          }

          await onSubmit({ ...data, typeId: selectedMember.id });
          navigate("../list");
        })}
      >
        <TextBox label="Name" {...get("name")} />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Member Type
          </label>
          {loadingMembers ? (
            <div>Loading Members Types...</div>
          ) : (
            <select
              {...get("typeName").control.register(get("typeName").name)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-100"
            >
              <option value="">Select Category</option>
              {members.map((mem) => (
                <option key={mem.id} value={mem.name}>
                  {mem.name}
                </option>
              ))}
            </select>
          )}
          {errors.typeName && (
            <div className="text-red-500">{errors.typeName.message}</div>
          )}
        </div>

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
