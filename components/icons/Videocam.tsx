import { IconProps } from './types.ts'

export default function Videocam({
  primaryFill = 'fill-primary',
  secondaryFill = 'fill-primary-4',
  width = 'w-8',
}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={width}>
      <path
        class={secondaryFill}
        d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z"
      />
      <rect width="14" height="14" x="2" y="5" class={primaryFill} rx="2" />
    </svg>
  )
}
