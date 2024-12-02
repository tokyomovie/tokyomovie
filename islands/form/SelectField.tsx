import { LabelGroup } from "./mod.ts";
import Select from "../../components/Select.tsx";
import { JSX } from "preact/jsx-runtime";

export default function SelectField({
  name,
  label,
  options,
  required,
  helperText,
  error,
  onChange,
  value,
}: {
  name: string;
  label: string;
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
        htmlFor={name}
        labelText={label}
        required={required}
        helperText={helperText}
      />
      <Select
        value={value}
        id={name}
        name={name}
        options={options}
        onChange={onChange}
      />
      {error && <p class="text-error">{error}</p>}
    </div>
  );
}
