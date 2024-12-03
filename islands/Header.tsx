import { useSignal } from "@preact/signals";
import Menu from "#/components/icons/Menu.tsx";
import Navigation from "#/components/Navigation.tsx";
import { User } from "#/database/query/user.ts";
import clsx from "npm:clsx";

export default function Header(
  { user }: { user: User | null },
) {
  const menuShown = useSignal(false);

  return (
    <header class="relative">
      <div
        class={clsx("w-full absolute transition-all z-30 top-[-100%]", {
          "top-[100%]": menuShown.value,
        })}
      >
        <Navigation user={user} />
      </div>
      <div class="relative z-40 bg-primary px-6 pb-6 pt-12 pxy flex flex-col gap-4 justify-center items-center border-b-2 border-b-primary bg-primary drop-shadow-md z-10">
        <button
          class="absolute z-50 bg-primary rounded top-4 right-4"
          onClick={() => {
            menuShown.value = !menuShown.value;
          }}
        >
          <Menu primaryFill="fill-background" />
        </button>
        <div class="flex gap-4">
          <div class="animate-spin w-3">⭐</div>
          <h1 class="text-foreground text-xl font-bold">
            tokyo movie group よーこそ
          </h1>
          <div class="animate-spin w-3">⭐</div>
        </div>
        <div class="text-foreground">
          〜〜〜 an evening with the staaaars 〜〜〜
        </div>
      </div>
    </header>
  );
}
