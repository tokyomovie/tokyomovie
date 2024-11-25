import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <div
      data-name="admin-layout"
      class="p-4 bg-background text-foreground min-h-full"
    >
      <Component />
    </div>
  );
}
