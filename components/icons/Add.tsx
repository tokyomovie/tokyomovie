import { IconProps } from './types.ts'

export default function Add({
  primaryFill = 'fill-primary',
  secondaryFill = 'fill-primary-4',
  width = 'w-8',
}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={width}>
      <circle cx="12" cy="12" r="10" class={primaryFill} />
      <path
        class={secondaryFill}
        d="M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4z"
      />
    </svg>
  )
}
