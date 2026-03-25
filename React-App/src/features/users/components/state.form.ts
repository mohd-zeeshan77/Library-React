import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required().min(1).max(100).messages({
    "string.empty": "User name is required",
    "string.min": "User name must be at least 1 character",
    "string.max": "User name cannot exceed 100 characters",
  }),
  typeName: Joi.string().required().messages({
    "string.empty": "Type is required",
  }),
});

export function useStateForm(onLoad?: () => Promise<Master.UserItems>) {
  const { control, handleSubmit, formState, reset } = useForm<Master.UserForm>({
    defaultValues: {
      name: "",
      typeName: "",
    },
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (onLoad) {
      onLoad().then((data) => {
        reset({
          name: data?.name ?? "",
          typeName: data?.typeName ?? "",
        });
      });
    }
  }, [onLoad, reset]);

  return {
    get: (name: keyof Master.UserForm) => ({ control, name }),
    submitting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit,
  };
}
