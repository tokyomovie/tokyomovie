import { ComponentChildren, JSX } from "preact";

export default function Button(
  { children, type = "button", ...buttonProps }:
    & { children: ComponentChildren }
    & JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button class="py-2 px-4 border rounded" type={type} {...buttonProps}>
      {children}
    </button>
  );
}
