import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
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
      },
      resolver: joiResolver(schema),
    });

  useEffect(() => {
    if (onLoad) {
      onLoad().then((data) => {
        reset({
          userName: data?.userName ?? "",
          bookName: data?.bookName ?? "",
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
