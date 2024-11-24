import { useSignal, useSignalEffect } from '@preact/signals'
import { SelectProps } from '../../components/Select.tsx'
import Button from '../Button.tsx'
import SelectField from '../form/SelectField.tsx'
import InputField from '../form/InputField.tsx'
import CheckboxField from '../form/CheckboxField.tsx'
import Stars from '../stars/Stars.tsx'
import Divider from '../../components/Divider.tsx'

const EXAMPLE_FORM_ID = 'example-form'

const exampleSelectData: SelectProps = {
  name: 'example-select',
  invalid: false,
  disabled: false,
  options: [
    { value: 'option-one', label: 'Option One' },
    { value: 'option-two', label: 'Option Two' },
    { value: 'option-three', label: 'Option Three' },
  ],
}

export default function FormIsland() {
  const invalid = useSignal(false)
  const showStars = useSignal(false)
  useSignalEffect(() => {
    showStars.value = false
  })
  return (
    <form
      className="max-w-lg m-8"
      id={EXAMPLE_FORM_ID}
      onSubmit={(event) => {
        event.preventDefault()
        const formEl = event.target as HTMLFormElement
        const data = new FormData(formEl)
        console.log(data.get('example-select'))
        console.log(data.get('example-input'))
        console.log(data.get('example-check') === 'on')
      }}
    >
      <SelectField
        name="example-select"
        label="example select"
        helperText="this text helps"
        error="somethings wrong"
        required
        options={exampleSelectData.options}
      />
      <InputField
        name="example-input"
        label="example input"
        helperText="this helps a lot"
        error="no good son"
        required
      />
      <CheckboxField
        labelText="example check"
        name="example-check"
        helperText="this text also helps"
        error="sorry you cant check it"
        required
      />
      <Button
        onClick={() => {
          console.log('button clicked')
          // invalid.value = !invalid.value
        }}
        type="submit"
      >
        button
      </Button>
      <Divider />
      <p class="text-success">this was a successful action you took!</p>
      <Divider />
      <Button
        onClick={() => {
          showStars.value = true
          setTimeout(() => {
            showStars.value = false
          }, 1000)
        }}
      >
        be a star
      </Button>
      {showStars.value && <Stars number={100} spin />}
      <Stars number={100} spin />
    </form>
  )
}
