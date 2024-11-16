import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component, state }: PageProps) {
  return (
    <div data-name="admin-layout" class="py-4">
      <Component />
    </div>
  );
}
