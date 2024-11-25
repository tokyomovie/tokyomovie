import { JSX } from 'preact/jsx-runtime'
import Important from './icons/Important.tsx'
import Check from './icons/Check.tsx'
import Notification from './icons/Notification.tsx'
import StarIcon from './icons/StarIcon.tsx'

export interface InfoProps {
  type: 'info' | 'success' | 'error'
  message: string
  icon?: boolean
  after?: JSX.Element
}

export default function Info({ type, message, icon = true, after }: InfoProps) {
  if (type === 'success')
    return (
      <div class="w-full bg-success-2 border-success border text-foreground rounded p-5 flex gap-2 justify-between items-center">
        {icon && (
          <Check
            primaryFill="fill-success"
            secondaryFill="fill-success-2"
            width="w-6"
          />
        )}
        <div class="w-full">{message}</div>
        {after}
      </div>
    )
  if (type === 'error')
    return (
      <div class="w-full bg-error-2 border-error border text-foreground rounded p-5 flex gap-2 justify-between items-center">
        {icon && (
          <Important
            primaryFill="fill-error"
            secondaryFill="fill-error-2"
            width="w-6"
          />
        )}
        <div class="w-full">{message}</div>
        {after}
      </div>
    )
  return (
    <div class="w-full bg-primary-4 border-primary border text-foreground rounded p-5 flex gap-2 justify-between items-center">
      {icon && <StarIcon width="w-6" />}
      <div class="w-full">{message}</div>
      {after}
    </div>
  )
}
