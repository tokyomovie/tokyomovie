import { FreshContext } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";
import { State } from "../../types/request.ts";

export const handler = {
  POST(_req: Request, ctx: FreshContext<State>) {
    const { user } = ctx.state;
    const headers = new Headers();

    if (user) {
      ctx.state.user = null;
      deleteCookie(headers, "auth", { path: "/" });
    }

    headers.set("location", "/login");
    return new Response(null, {
      headers,
      status: 303,
    });
  },
};
