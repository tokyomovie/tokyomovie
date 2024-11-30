import { JSX } from "preact/jsx-runtime";
import Important from "./icons/Important.tsx";
import Check from "./icons/Check.tsx";
import StarIcon from "./icons/StarIcon.tsx";
import { ComponentChildren } from "preact";
import clsx from "npm:clsx";

export interface InfoProps {
  type: "info" | "success" | "error";
  message?: string;
  children?: ComponentChildren;
  icon?: boolean;
  after?: JSX.Element;
}

export default function Info(
  { type, message, children, icon = true, after }: InfoProps,
) {
  const findIcon = () => {
    if (type === "success") {
      return (
        <Check
          primaryFill="fill-success"
          secondaryFill="fill-success-2"
          width="w-6"
        />
      );
    }
    if (type === "error") {
      return (
        <Important
          primaryFill="fill-error"
          secondaryFill="fill-error-2"
          width="w-6"
        />
      );
    }
    return <StarIcon width="w-6" />;
  };
  const iconToUse = findIcon();

  return (
    <div
      class={"w-full border text-foreground rounded p-5 flex gap-2 justify-between items-center " +
        clsx(
          type === "info" && "bg-primary-4 border-primary",
          type === "success" && "bg-success-2 border-success",
          type === "error" && "bg-error-2 border-error border",
        )}
    >
      {icon && iconToUse}
      <div class="w-full">{message || children}</div>
      {after}
    </div>
  );
}
