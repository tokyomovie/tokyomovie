import { IconProps } from "./types.ts";

export default function Close({
  primaryFill = "fill-primary",
  secondaryFill = "fill-primary-4",
  width = "w-8",
}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={width}>
      <rect width="18" height="18" x="3" y="3" class={primaryFill} rx="2" />
      <path
        class={secondaryFill}
        d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"
      />
    </svg>
  );
}
