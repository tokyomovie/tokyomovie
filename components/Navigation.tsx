import { USER_ROUTES } from "../constants/routes.ts";

export default function Navigation() {
  return (
    <nav class="flex w-full justify-between px-[60px]">
      <a
        class="text-background-low underline font-bold"
        href={USER_ROUTES.event}
      >
        events
      </a>
      <div class="text-background-low">|</div>
      <a
        class="text-background-low underline font-bold"
        href={USER_ROUTES.movie}
      >
        movies
      </a>
      <div class="text-background-low">|</div>
      <a
        class="text-background-low underline font-bold"
        href={USER_ROUTES.poll}
      >
        poll
      </a>
    </nav>
  );
}
