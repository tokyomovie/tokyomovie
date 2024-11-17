export default function SelectField(
  { name, options }: {
    name: string;
    options: { value: string; label: string }[];
  },
) {
  return (
    <div class="flex gap-2">
      <label>{name}</label>
      <select name={name}>
        {options.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
