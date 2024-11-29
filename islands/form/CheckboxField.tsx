import Checkbox from "../../components/Checkbox.tsx";

export interface CheckboxFieldProps {
  labelText: string;
  name: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export default function CheckboxField(props: CheckboxFieldProps) {
  const { name, labelText, helperText, error, required } = props;
  return (
    <div>
      <div class="flex flex-row gap-4">
        <Checkbox name={name} />
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
      {error && <p class="text-error">{error}</p>}
    </div>
  );
}
