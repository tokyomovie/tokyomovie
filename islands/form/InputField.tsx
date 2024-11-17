export default function InputField(
  { name, type, value }: { name: string; type: string; value?: string },
) {
  return (
    <div class="flex gap-2">
      <label>{name}</label>
      <input class="border" type={type} name={name} value={value} />
    </div>
  );
}
