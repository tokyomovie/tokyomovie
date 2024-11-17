import { ComponentChildren } from "preact";

export default function Button(
  { children, type = "button" }: { children: ComponentChildren; type?: string },
) {
  return (
    <button class="py-2 px-4 border rounded" type={type}>
      {children}
    </button>
  );
}
