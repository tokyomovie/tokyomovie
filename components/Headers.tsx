export default function Header() {
  return (
    <header class="h-28 flex flex-col gap-4 justify-center items-center border-b-2 border-b-primary bg-primary">
      <div class="flex gap-4">
        <div class="animate-spin w-3">⭐</div>
        <h1 class="text-foreground text-xl font-bold">
          tokyo movie night よーこそ
        </h1>
        <div class="animate-spin w-3">⭐</div>
      </div>
      <div class="text-foreground">〜〜〜 a night with the staaaars 〜〜〜</div>
    </header>
  )
}
