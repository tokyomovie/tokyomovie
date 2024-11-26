import { JSX } from "preact";

export type InputProps = {
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
} & JSX.HTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  const {
    name,
    value,
    type = "text",
    placeholder,
    invalid,
    disabled,
    ...inputProps
  } = props;

  return (
    <input
      class="border rounded p-2 shadow-block outline-offset-0 focus:outline-none focus:shadow-focus transition duration-200 text-black"
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      aria-invalid={invalid}
      disabled={disabled}
      {...inputProps}
    />
  );
}
