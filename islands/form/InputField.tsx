import { JSX } from "preact";
import { LabelGroup } from "./mod.ts";
import Input from "../../components/Input.tsx";
import FormFieldError from "#/islands/form/FormFieldError.tsx";

export default function InputField({
  name,
  label,
  helperText,
  required,
  changeHandler,
  type = "text",
  value,
  error,
  ...inputProps
}: {
  name: string;
  label: string;
  required?: boolean;
  helperText?: string;
  changeHandler?: JSX.GenericEventHandler<HTMLInputElement>;
  type?: string;
  value?: string;
  error?: string;
} & JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <div class="flex gap-2 flex-col w-full">
      <LabelGroup
        labelText={label}
        htmlFor={name}
        helperText={helperText}
        required={required}
      />
      <Input
        onChange={changeHandler}
        {...inputProps}
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        aria-required={required}
      />
      <FormFieldError errorText={error} />
    </div>
  );
}
