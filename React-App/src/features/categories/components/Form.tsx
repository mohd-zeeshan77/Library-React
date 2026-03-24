import { useNavigate } from "react-router";

import { useStateForm } from "./state.form";
import { TextBox } from "../../../shared/components/forms";
import { Button } from "../../../shared/components/buttons";

interface FormProps {
  onSubmit: (p: Master.CategoryForm) => Promise<void>;
  onLoad?: () => Promise<Master.CategoryItem>;
  submitCaption: string;
}

export default function Form({ onLoad, onSubmit, ...props }: FormProps) {
  const { get, handleSubmit, submitting } = useStateForm(onLoad);

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
          navigate("../list");
        })}
      >
        <TextBox label="Name" {...get("name")} />

        <Button caption={props.submitCaption} disabled={submitting} />
      </form>
    </div>
  );
}
