import { IconProps } from './types.ts'

export default function Important({
  primaryFill = 'fill-primary',
  secondaryFill = 'fill-primary-4',
  width = 'w-8',
}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={width}>
      <path class={primaryFill} d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
      <path
        class={secondaryFill}
        d="M12 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.9c-.13 1.2-1.88 1.2-2 0l-.5-5a1 1 0 0 1 1-1.1h1a1 1 0 0 1 1 1.1l-.5 5z"
      />
    </svg>
  )
}
