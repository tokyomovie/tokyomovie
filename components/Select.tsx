import { JSX } from "preact";

export type SelectProps = {
  name: string;
  options: Array<{ value: string; label: string }>;
  invalid?: boolean;
  disabled?: boolean;
} & JSX.HTMLAttributes<HTMLSelectElement>;

export default function Select({
  name,
  options,
  invalid = false,
  disabled = false,
  ...rest
}: SelectProps) {
  return (
    <select
      class="border rounded shadow-block p-2 outline-offset-0 focus:outline-none focus:shadow-focus transition duration-200 text-black"
      name={name}
      aria-invalid={invalid}
      disabled={disabled}
      {...rest}
    >
      {options.map(({ value, label }) => {
        return <option value={value}>{label}</option>;
      })}
    </select>
  );
}
