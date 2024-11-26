import { ComponentChildren, JSX } from "preact";
import clsx from "npm:clsx";

export default function Button({
  children,
  type = "button",
  fullWidth,
  inverse,
  ...buttonProps
}: {
  fullWidth?: boolean;
  inverse?: boolean;
  children: ComponentChildren;
} & JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      class={"py-2 px-4  text-foreground shadow-block border rounded  focus:outline-none focus:shadow-focus transition duration-200 active:outline-none active:shadow-focus active:bg-primary-2 " +
        clsx(
          fullWidth && "w-full",
          inverse && "bg-primary-4 border-primary",
          !inverse && "bg-primary border-primary-2",
        )}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
