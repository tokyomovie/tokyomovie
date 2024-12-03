import { JSX } from "preact/jsx-runtime";
import { LabelGroup } from "./mod.ts";
import Select from "../../components/Select.tsx";
import FormFieldError from "#/islands/form/FormFieldError.tsx";

export default function SelectField({
  name,
  label,
  options,
  error,
  onChange,
  helperText,
  required,
  value,
}: {
  name: string;
  label: string;
  changeHandler?: () => void;
  options: { value: string; label: string }[];
  required?: boolean;
  helperText?: string;
  error?: string;
  onChange?: JSX.HTMLAttributes<HTMLSelectElement>["onChange"];
  value?: string;
}) {
  return (
    <div class="flex gap-2 flex-col">
      <LabelGroup
        labelText={label}
        htmlFor={name}
        helperText={helperText}
        required={required}
      />
      <Select
        value={value}
        id={name}
        name={name}
        options={options}
        onChange={onChange}
        required={required}
        aria-required={required}
      />
      <FormFieldError errorText={error} />
    </div>
  );
}
