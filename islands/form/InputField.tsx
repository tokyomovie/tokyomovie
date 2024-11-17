export default function InputField(
  { name, type, value, error }: {
    name: string;
    type: string;
    value?: string;
    error?: string;
  },
) {
  return (
    <div class="flex gap-2">
      <label>{name}</label>
      <input class="border" type={type} name={name} value={value} />
      {error && <p class="text-error">{error}</p>}
    </div>
  );
}
