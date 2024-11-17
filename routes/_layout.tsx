import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <div data-name="app-layout" class="max-w-[1200px] m-auto h-screen">
      <Component />
    </div>
  );
}
