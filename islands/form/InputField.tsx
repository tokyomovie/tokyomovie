import { LabelGroup } from './mod.ts'
import Input from '../../components/Input.tsx'

export default function InputField({
  name,
  label,
  type = 'text',
  helperText,
  value,
  error,
  required,
}: {
  name: string
  label: string
  type?: string
  helperText?: string
  value?: string
  error?: string
  required?: boolean
}) {
  return (
    <div class="flex gap-2 flex-col">
      <LabelGroup
        labelText={label}
        required={required}
        helperText={helperText}
      />
      <Input name={name} type={type} value={value} />
      {error && <p class="text-error">{error}</p>}
    </div>
  )
}
