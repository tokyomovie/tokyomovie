import { IconProps } from "./types.ts";

export default function Menu({
  primaryFill = "fill-primary",
  secondaryFill = "fill-primary-4",
  width = "w-8",
}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={width}>
      <path
        class={primaryFill}
        fill-rule="evenodd"
        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
      />
    </svg>
  );
}
