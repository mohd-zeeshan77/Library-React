import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

interface TextBoxProps<TForm extends FieldValues> {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  name?: Path<TForm>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<TForm, any, TForm>;
  errorMessage?: string;
}

export default function TextBox<TForm extends FieldValues>(
  props: TextBoxProps<TForm>,
) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {props.label}
      </label>
      {!props.control ? (
        <>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder={props.placeholder}
            value={props.value ?? ""}
            onChange={(e) => props.onChange?.(e.target.value)}
          />
          <div className="text-red-500">{props.errorMessage}</div>
        </>
      ) : (
        <Controller
          name={props.name!}
          control={props.control}
          render={(p) => {
            return (
              <>
                <input
                  id={props.name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder={props.placeholder}
                  {...p.field}
                  value={p.field.value ?? ""}
                />
                <div className="text-red-500">
                  {p.fieldState.error?.message}
                </div>
              </>
            );
          }}
        />
      )}
    </div>
  );
}
