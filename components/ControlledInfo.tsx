import { ComponentChildren } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import Info, { InfoProps } from "../components/Info.tsx";
import Close from "./icons/Close.tsx";

type InfoPropTypes = Pick<InfoProps, "type" | "message">;

interface ControlledInfoProps extends InfoPropTypes {
  show: boolean;
  children?: ComponentChildren;
  onClose: () => void;
}

export default function ControlledInfo({
  type,
  message,
  children,
  show,
  onClose,
}: ControlledInfoProps) {
  let closeToUse = <Close />;
  if (type === "success") {
    closeToUse = (
      <Close primaryFill="fill-success" secondaryFill="fill-success-2" />
    );
  }
  if (type === "error") {
    closeToUse = (
      <Close primaryFill="fill-error" secondaryFill="fill-error-2" />
    );
  }
  if (show) {
    return (
      <Info
        type={type}
        message={message}
        after={
          <button
            class="rounded focus:outline-none focus:shadow-focus transition duration-200 active:outline-none active:shadow-focus"
            onClick={onClose}
          >
            {closeToUse}
          </button>
        }
      >
        {children}
      </Info>
    );
  }
  return null;
}
