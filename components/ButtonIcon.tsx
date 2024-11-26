import { ComponentChildren, JSX } from "preact";
import Button from "../islands/Button.tsx";

export default function ButtonIcon({
  children,
}: {
  children: ComponentChildren;
}) {
  return <Button>{children}</Button>;
}
