import { ComponentChildren, JSX } from "preact";
import clsx from "npm:clsx";

export default function Button({
  children,
  type = "button",
  fullWidth,
  ...buttonProps
}: {
  fullWidth?: boolean;
  children: ComponentChildren;
} & JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      class={"py-2 px-4 bg-primary text-foreground shadow-block border border-primary-2 rounded  focus:outline-none focus:shadow-focus transition duration-200 active:outline-none active:shadow-focus active:bg-primary-2 " +
        clsx(fullWidth && "w-full")}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
