import { JSX } from "preact";
import TextArea from "#/components/TextArea.tsx";
import { FormFieldError, LabelGroup } from "#/islands/form/mod.ts";

export type TextAreaFormFieldProps = {
  name: string;
  label: string;
  changeHandler?: JSX.GenericEventHandler<HTMLTextAreaElement>;
  value?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
} & JSX.HTMLAttributes<HTMLTextAreaElement>;

export default function TextAreaFormField(props: TextAreaFormFieldProps) {
  const { name, label, changeHandler, value, error, helperText, required } =
    props;
  return (
    <div>
      <LabelGroup
        labelText={label}
        htmlFor={name}
        helperText={helperText}
        required={required}
      />
      <TextArea
        onChange={changeHandler}
        name={name}
        value={value}
        required={required}
        aria-required={required}
      />
      <FormFieldError errorText={error} />
    </div>
  );
}
