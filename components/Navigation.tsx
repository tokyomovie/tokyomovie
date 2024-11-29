export default function Navigation() {
  return (
    <nav class="flex w-full justify-between px-[60px]">
      <a class="text-background-low underline font-bold" href="/user/event">
        events
      </a>
      <div class="text-background-low">|</div>
      <a class="text-background-low underline font-bold" href="/user/movie">
        movies
      </a>
      <div class="text-background-low">|</div>
      <a class="text-background-low underline font-bold" href="/user/poll">
        poll
      </a>
    </nav>
  );
}
