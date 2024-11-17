import { PageProps } from "$fresh/server.ts";
import Button from "../../islands/Button.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div data-name="user-layout" class="size-full flex flex-col">
      {/* make a sick header */}
      <div class="h-16 flex items-center">
        <form action="/user/logout" method="POST">
          <Button type="submit">Logout</Button>
        </form>
      </div>
      <Component />
    </div>
  );
}
