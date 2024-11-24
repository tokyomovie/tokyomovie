import { ComponentChildren, JSX } from 'preact'

export default function Button({
  children,
  type = 'button',
  ...buttonProps
}: { children: ComponentChildren } & JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      class="py-2 px-4 bg-primary text-foreground shadow-block border border-secondary rounded  focus:outline-none focus:shadow-focus transition duration-200 active:outline-none active:shadow-focus active:bg-secondary"
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
