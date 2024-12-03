import { JSX } from "preact";
import { LabelGroup } from "./mod.ts";
import Input from "../../components/Input.tsx";
import FormFieldError from "#/islands/form/FormFieldError.tsx";
import { LabelGroupProps } from "#/islands/form/LabelGroup.tsx";

export default function InputField({
  name,
  labelProps,
  changeHandler,
  type = "text",
  value,
  error,
  ...inputProps
}: {
  name: string;
  labelProps: LabelGroupProps;
  changeHandler?: JSX.GenericEventHandler<HTMLInputElement>;
  type?: string;
  value?: string;
  error?: string;
} & JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <div class="flex gap-2 flex-col w-full">
      <LabelGroup
        {...labelProps}
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
