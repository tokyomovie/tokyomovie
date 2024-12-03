import { JSX } from "preact/jsx-runtime";
import { LabelGroup } from "./mod.ts";
import Select from "../../components/Select.tsx";
import FormFieldError from "#/islands/form/FormFieldError.tsx";
import { LabelGroupProps } from "#/islands/form/LabelGroup.tsx";

export default function SelectField({
  name,
  labelProps,
  options,
  error,
  onChange,
  value,
}: {
  name: string;
  labelProps: LabelGroupProps;
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
        {...labelProps}
      />
      <Select
        value={value}
        id={name}
        name={name}
        options={options}
        onChange={onChange}
      />
      <FormFieldError errorText={error} />
    </div>
  );
}
