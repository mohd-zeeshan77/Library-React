import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required().min(1).max(100).messages({
    "string.empty": "Book name is required",
    "string.min": "Book name must be at least 1 character",
    "string.max": "Book name cannot exceed 100 characters",
  }),
  authorName: Joi.string().required().min(1).max(100).messages({
    "string.empty": "Author name is required",
    "string.min": "Author name must be at least 1 character",
    "string.max": "Author name cannot exceed 100 characters",
  }),
  publisher: Joi.string().required().min(1).max(100).messages({
    "string.empty": "Publisher is required",
  }),
  edition: Joi.string().required().min(1).max(50).messages({
    "string.empty": "Edition is required",
  }),
  price: Joi.number().precision(2).required().min(0).messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "number.precision": "Price can have up to 2 decimal places",
  }),
  categoryName: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  stock: Joi.number().required().min(0).messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock cannot be negative",
  }),
});

export function useStateForm(onLoad?: () => Promise<Master.BookItem>) {
  const { control, handleSubmit, formState, reset } = useForm<Master.BookForm>({
    defaultValues: {
      name: "",
      authorName: "",
      publisher: "",
      edition: "",
      price: 0,
      categoryName: "",
      stock: 0,
    },
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (onLoad) {
      onLoad().then((data) => {
        reset({
          name: data?.name ?? "",
          authorName: data?.authorName ?? "",
          publisher: data?.publisher ?? "",
          edition: data?.edition ?? "",
          price: data?.price ?? 0,
          categoryName: data?.categoryName ?? "",
          stock: data?.stock ?? 0,
        });
      });
    }
  }, [onLoad, reset]);

  return {
    get: (name: keyof Master.BookForm) => ({ control, name }),
    submitting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit,
  };
}
