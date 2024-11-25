import { IconProps } from './types.ts'
export default function Dots({
  primaryFill = 'fill-primary',
  secondaryFill = 'fill-primary-4',
  width = 'w-8',
}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={width}>
      <path
        class={primaryFill}
        fill-rule="evenodd"
        d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
      />
    </svg>
  )
}
