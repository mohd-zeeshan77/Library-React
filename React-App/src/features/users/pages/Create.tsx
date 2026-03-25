import Form from "../components/Form";
import { useNewUserMutation, useMembersForUsersQuery } from "../queries";

export default function Create() {
  const { mutateAsync } = useNewUserMutation();
  const { data: members = [] } = useMembersForUsersQuery();

  return (
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
  );
}
