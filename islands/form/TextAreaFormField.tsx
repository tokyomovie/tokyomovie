import { JSX } from "preact";
import TextArea from "#/components/TextArea.tsx";
import { FormFieldError, LabelGroup } from "#/islands/form/mod.ts";
import { LabelGroupProps } from "#/islands/form/LabelGroup.tsx";

export type TextAreaFormFieldProps = {
  name: string;
  labelProps: LabelGroupProps;
  changeHandler?: JSX.GenericEventHandler<HTMLTextAreaElement>;
  value?: string;
  error?: string;
  required?: boolean;
} & JSX.HTMLAttributes<HTMLTextAreaElement>;

export default function TextAreaFormField(props: TextAreaFormFieldProps) {
  const { name, labelProps, changeHandler, value, error } = props;
  return (
    <div>
      <LabelGroup {...labelProps} />
      <TextArea onChange={changeHandler} name={name} value={value} />
      <FormFieldError errorText={error} />
    </div>
  );
}
