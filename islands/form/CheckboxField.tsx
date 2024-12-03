import { JSX } from "preact";
import Checkbox from "../../components/Checkbox.tsx";
import FormFieldError from "#/islands/form/FormFieldError.tsx";

export interface CheckboxFieldProps {
  labelText: string;
  name: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  changeHandler?: JSX.GenericEventHandler<HTMLInputElement>;
}

export default function CheckboxField(props: CheckboxFieldProps) {
  const { name, labelText, helperText, error, required, changeHandler } = props;
  return (
    <div>
      <div class="flex flex-row gap-4">
        <Checkbox onChange={changeHandler} name={name} />
        <div class="flex gap-2">
          <label
            htmlFor={name}
            class="text-large font-bold relative text-foreground"
          >
            {labelText}
            {required && (
              <div class="text-error absolute right-[-28px] top-0">⭐</div>
            )}
          </label>
        </div>
      </div>
      {helperText && <div class="text-foreground-back mt-2">{helperText}</div>}
      <FormFieldError errorText={error} />
    </div>
  );
}
