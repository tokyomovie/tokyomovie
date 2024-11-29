import { ComponentChildren } from "preact";

export default function StackCenter(
  { children, classes }: { children: ComponentChildren; classes?: string },
) {
  return (
    <div
      class={"max-w-screen-md flex flex-col items-center justify-center" +
        " " + classes}
    >
      {children}
    </div>
  );
}
