import { LabelGroup } from './mod.ts'
import Select from '../../components/Select.tsx'

export default function SelectField({
  name,
  label,
  options,
  required,
  helperText,
  error,
}: {
  name: string
  label: string
  options: { value: string; label: string }[]
  required?: boolean
  helperText?: string
  error?: string
}) {
  return (
    <div class="flex gap-2 flex-col">
      <LabelGroup
        labelText={label}
        required={required}
        helperText={helperText}
      />
      <Select name={name} options={options} />
      {error && <p class="text-error">{error}</p>}
    </div>
  )
}
