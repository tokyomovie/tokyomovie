import { JSX } from "preact";

export interface CheckboxProps extends JSX.HTMLAttributes<HTMLInputElement> {
  name: string;
  invalid?: boolean;
  disabled?: boolean;
}

export default function Checkbox(props: CheckboxProps) {
  const { name, invalid, disabled, ...rest } = props;
  return (
    <input
      class="w-6 border rounded shadow-block p-2 outline-offset-0 focus:outline-none focus:shadow-focus transition duration-200 cursor-pointer"
      name={name}
      id={name}
      type="checkbox"
      aria-invalid={invalid}
      disabled={disabled}
      {...rest}
    />
  );
}
