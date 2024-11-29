import { ComponentChildren } from "preact";
import Link from "./icons/Link.tsx";

export default function LogoutForm(
  { children }: { children?: ComponentChildren },
) {
  return (
    <form action="/user/logout" method="POST">
      <button type="submit">
        {children}
      </button>
    </form>
  );
}
