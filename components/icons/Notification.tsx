import { IconProps } from './types.ts'

export default function Notification({
  primaryFill = 'fill-primary',
  secondaryFill = 'fill-primary-4',
  width = 'w-8',
}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={width}>
      <circle cx="12" cy="19" r="3" class={secondaryFill} />
      <path
        class={primaryFill}
        d="M10.02 4.28L10 4a2 2 0 1 1 3.98.28A7 7 0 0 1 19 11v5a1 1 0 0 0 1 1 1 1 0 0 1 0 2H4a1 1 0 0 1 0-2 1 1 0 0 0 1-1v-5a7 7 0 0 1 5.02-6.72z"
      />
    </svg>
  )
}
