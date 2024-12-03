import { JSX } from "preact";
import { LabelGroup } from "./mod.ts";
import Input from "../../components/Input.tsx";
import FormFieldError from "#/islands/form/FormFieldError.tsx";

export default function InputField({
  name,
  label,
  changeHandler,
  type = "text",
  helperText,
  value,
  error,
  required,
  ...inputProps
}: {
  name: string;
  label: string;
  changeHandler?: JSX.GenericEventHandler<HTMLInputElement>;
  type?: string;
  helperText?: string;
  value?: string;
  error?: string;
  required?: boolean;
} & JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <div class="flex gap-2 flex-col w-full">
      <LabelGroup
        htmlFor={name}
        labelText={label}
        required={required}
        helperText={helperText}
      />
      <Input
        onChange={changeHandler}
        {...inputProps}
        id={name}
        name={name}
        type={type}
        value={value}
      />
      <FormFieldError errorText={error} />
    </div>
  );
}
