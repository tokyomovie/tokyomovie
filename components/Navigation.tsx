import { USER_ROUTES } from "#/constants/routes.ts";
import LogoutForm from "#/components/LogoutForm.tsx";
import { User } from "#/database/query/user.ts";

export default function Navigation({ user }: { user?: User | null }) {
  return (
    <nav class="flex flex-col gap-2 p-4 bg-background-low w-full justify-between px-[60px]">
      <a
        class="underline font-bold"
        href={USER_ROUTES.event}
      >
        events
      </a>
      <a
        class="underline font-bold"
        href={USER_ROUTES.movie}
      >
        movies
      </a>
      <a
        class="underline font-bold"
        href={USER_ROUTES.poll}
      >
        poll
      </a>
      <a
        class="underline font-bold"
        href={USER_ROUTES.profile}
      >
        profile
      </a>
      {user && (
        <div>
          <LogoutForm>
            Logout
          </LogoutForm>
        </div>
      )}
    </nav>
  );
}
