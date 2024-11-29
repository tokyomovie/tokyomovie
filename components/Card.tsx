import { ComponentChildren } from "preact";

export default function Card({ children }: { children: ComponentChildren }) {
  return (
    <div class="p-3 flex">
      <div class="p-2 flex flex-row gap-3 shadow-block border border-highlight rounded text-foreground w-full">
        {children}
      </div>
    </div>
  );
}
