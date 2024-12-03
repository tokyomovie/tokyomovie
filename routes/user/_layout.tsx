import { PageProps } from "$fresh/server.ts";
import Header from "#/islands/Header.tsx";
import { State } from "#/types/request.ts";

export default function Layout({ Component, state }: PageProps<null, State>) {
  return (
    <div data-name="user-layout" class="size-full flex flex-col">
      <Header user={state.context.user} />
      <Component />
    </div>
  );
}
