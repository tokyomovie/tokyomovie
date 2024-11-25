import { useSignal, useSignalEffect } from "@preact/signals";
import Star from "./Star.tsx";

export default function Stars({
  number = 350,
  scatterHang,
}: {
  number?: number;
  scatterHang?: boolean;
}) {
  const show = useSignal(true);
  const transitionMs = 750;
  const starsTimeout = 750;
  const starTimeout = scatterHang ? 375 : 150;

  useSignalEffect(() => {
    const stars = document.querySelector(".stars");
    stars?.classList.add("opacity-0");

    setTimeout(() => {
      console.log("ran timeout");
      show.value = false;
    }, starsTimeout);
  });

  const starsArray = Array.from({ length: number }).map((_, index) => (
    <Star index={index} timeout={starTimeout} transition={starTimeout} />
  ));
  if (show.value) {
    return (
      <div
        class="stars absolute h-screen w-screen top-0 left-0 flex content-center justify-center overflow-hidden"
        style={{ transitionDuration: transitionMs + "ms" }}
      >
        <div class="flex flex-wrap gap-2 content-center items-center justify-center max-w-[38rem] min-w-[20rem] relative">
          {starsArray}
        </div>
      </div>
    );
  }
  return <></>;
}
