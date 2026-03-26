import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
  dues: Joi.number().precision(2).required().min(0).messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "number.precision": "Price can have up to 2 decimal places",
  }),
  userName: Joi.string().required().messages({
    "string.empty": "User is required",
  }),
  bookName: Joi.string().required().messages({
    "string.empty": "Book is required",
  }),
});

export function useStateForm(onLoad?: () => Promise<Master.IssuedItem>) {
  const { control, handleSubmit, formState, reset } =
    useForm<Master.IssuedForm>({
      defaultValues: {
        userName: "",
        bookName: "",
        dues: 0,
      },
      resolver: joiResolver(schema),
    });

  useEffect(() => {
    if (onLoad) {
      onLoad().then((data) => {
        reset({
          userName: data?.userName ?? "",
          bookName: data?.bookName ?? "",
          dues: data?.dues ?? 0,
        });
      });
    }
  }, [onLoad, reset]);

  return {
    get: (name: keyof Master.IssuedForm) => ({ control, name }),
    submitting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit,
  };
}
