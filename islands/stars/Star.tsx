import { useSignal, useSignalEffect } from "@preact/signals";

export default function Star({ spin }: { spin?: boolean }) {
  const x = Math.floor(Math.random() * 1500);
  const y = Math.floor(Math.random() * 1500);
  const xpos = x % 2 === 0 ? "-" : "";
  const ypos = y % 2 === 0 ? "-" : "";
  if (spin) {
    return (
      <div
        class="star animate-spin w-3  transition-all absolute"
        style={{
          transform: `translateY(${xpos}${x}px) translateX(${ypos}${y}px)`,
        }}
      >
        ⭐
      </div>
    );
  }
  return <div class="transition absolute">⭐</div>;
}
