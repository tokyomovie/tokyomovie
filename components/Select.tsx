export interface SelectProps {
  name: string;
  options: Array<{ value: string; label: string }>;
  invalid?: boolean;
  disabled?: boolean;
}

export default function Select({
  name,
  options,
  invalid = false,
  disabled = false,
}: SelectProps) {
  return (
    <select
      class="border rounded shadow-block p-2 outline-offset-0 focus:outline-none focus:shadow-focus transition duration-200 text-black"
      name={name}
      aria-invalid={invalid}
      disabled={disabled}
    >
      {options.map(({ value, label }) => {
        return <option value={value}>{label}</option>;
      })}
    </select>
  );
}
