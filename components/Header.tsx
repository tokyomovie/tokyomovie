import LogoutForm from "./LogoutForm.tsx";
import Link from "./icons/Link.tsx";
import Navigation from "./Navigation.tsx";

export default function Header(
  { logout, nav }: { logout?: boolean; nav?: boolean },
) {
  return (
    <header class="relative px-6 pb-6 pt-12 pxy flex flex-col gap-4 justify-center items-center border-b-2 border-b-primary bg-primary">
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
      {logout && (
        <div class="absolute top-2 right-2">
          <LogoutForm>
            <Link primaryFill="fill-secondary" />
          </LogoutForm>
        </div>
      )}
      {nav && <Navigation />}
    </header>
  );
}
