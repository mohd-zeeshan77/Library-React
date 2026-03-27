import Form from "../components/Form";
import { useNewUserMutation, useMembersQuery } from "../queries";

export default function Create() {
  const { mutateAsync } = useNewUserMutation();
  const { data: members = [] } = useMembersQuery();

  return (
    <div>
      <div className="h-5 flex justify-center">
        <h1 className="text-yellow-900 font-bold text-3xl">ADD NEW MEMBER</h1>
      </div>
      <Form
        submitCaption="Create"
        onSubmit={async (user) => {
          const selectedMember = members.find((m) => m.name === user.typeName);

          if (!selectedMember) {
            throw new Error("Member type not selected or invalid");
          }

          await mutateAsync({
            typeId: selectedMember.id,
            user,
          });
        }}
      />
    </div>
  );
}
