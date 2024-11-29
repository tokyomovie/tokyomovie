import { PageProps } from "$fresh/server.ts";
import Header from "../../components/Header.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div data-name="user-layout" class="size-full flex flex-col">
      <Header logout nav />
      <Component />
    </div>
  );
}
