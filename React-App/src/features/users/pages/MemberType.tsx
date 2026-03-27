import { useParams, useNavigate } from "react-router-dom";
import { useMembersQuery, useMemberTypeMutation } from "../queries";
import { Button } from "../../../shared/components/buttons";
import { useState, useEffect } from "react";
import { Loader } from "../../../shared/components/loader";

export default function MemberType() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const userIdNum = id ? parseInt(id, 10) : null;

  const { data: members, isLoading: loadingMembers } = useMembersQuery();
  const mutation = useMemberTypeMutation();

  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  useEffect(() => {
    if (!userIdNum) {
      alert("Missing user information.");
      navigate("/users");
    }
  }, [userIdNum, navigate]);

  const handleChangeMember = async () => {
    if (!userIdNum || selectedMember === null) return;
    try {
      await mutation.mutateAsync({
        id: userIdNum,
        memberId: selectedMember,
      });
      navigate("/users");
    } catch (err) {
      console.error("Error updating membership:", err);
      alert("Failed to update membership.");
    }
  };

  if (loadingMembers) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow border-yellow-900 text-yellow-900">
      <h2 className="text-2xl font-bold mb-4">CHANGE USER MEMBERSHIP</h2>

      <label className="block mb-2 font-semibold">Select Member Type</label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={selectedMember ?? ""}
        onChange={(e) => setSelectedMember(Number(e.target.value))}
      >
        <option value="" disabled>
          -- Select Member Type --
        </option>
        {members?.map((m: Master.MemberItem) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      <div className="flex gap-4">
        <Button
          caption={mutation.isPending ? "Updating..." : "Update Membership"}
          onClick={handleChangeMember}
          disabled={selectedMember === null || mutation.isPending}
        />
        <Button caption="Back to Users" onClick={() => navigate("/users")} />
      </div>

      {mutation.isError && (
        <p className="mt-2 text-red-500">Failed to update membership.</p>
      )}
      {mutation.isSuccess && (
        <p className="mt-2 text-green-500">Membership updated successfully!</p>
      )}
    </div>
  );
}
