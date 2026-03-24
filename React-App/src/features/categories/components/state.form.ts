import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

// Joi schema for validation
const schema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 1 character",
    "string.max": "Name cannot exceed 100 characters",
  }),
});
type CategoryForm = {
  name: string;
};

export function useStateForm(onLoad?: () => Promise<Master.CategoryItem>) {
  const { control, handleSubmit, formState, reset } = useForm<CategoryForm>({
    defaultValues: {
      name: "",
    },
    resolver: joiResolver(schema),
  });
  useEffect(() => {
    if (onLoad) {
      onLoad().then((data) => {
        reset({
          name: data?.name ?? "",
        });
      });
    }
  }, [onLoad, reset]);

  return {
    get: (name: keyof CategoryForm) => ({ control, name }),
    submitting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit,
  };
}
