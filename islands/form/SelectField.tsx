export default function SelectField(
  { name, options, error }: {
    name: string;
    options: { value: string; label: string }[];
    error?: string;
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
      {error && <p class="text-error">{error}</p>}
    </div>
  );
}
