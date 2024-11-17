import { PageProps } from "$fresh/server.ts";
import Button from "../../islands/Button.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div data-name="user-layout" class="flex flex-col">
      {/* make a sick header */}
      <div class="h-8">
        <form action="/user/logout" method="POST">
          <Button type="submit">Logout</Button>
        </form>
      </div>
      <Component />
    </div>
  );
}
