import { JSX } from "preact";
import { LabelGroup } from "./mod.ts";
import Input from "../../components/Input.tsx";

export default function InputField({
  name,
  label,
  type = "text",
  helperText,
  value,
  error,
  required,
  ...inputProps
}: {
  name: string;
  label: string;
  type?: string;
  helperText?: string;
  value?: string;
  error?: string;
  required?: boolean;
} & JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <div class="flex gap-2 flex-col">
      <LabelGroup
        labelText={label}
        required={required}
        helperText={helperText}
      />
      <Input {...inputProps} name={name} type={type} value={value} />
      {error && <p class="text-error">{error}</p>}
    </div>
  );
}
