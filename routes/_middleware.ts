import { FreshContext } from "$fresh/server.ts";
import { authMiddleware } from "../middleware/auth.ts";
import { Context, State } from "../types/request.ts";

// memo: https://fresh.deno.dev/docs/examples/init-the-server
// export async function handler(
//   _req: Request,
//   ctx: FreshContext<State>,
// ) {
//   ctx.state.context = Context.instance();
//   if (ctx.destination === "route") {
//     console.log("i'm logged during a request!");
//     console.log(ctx.state.context);
//   }
//   const resp = await ctx.next();
//   return resp;
// }

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  ctx.state.context = Context.instance();

  return await authMiddleware({
    req,
    ctx,
    onError: (req) => {
      const url = new URL(req.url);
      if (url.pathname.startsWith("/api")) {
        return new Response(JSON.stringify({ message: "invalid request" }), {
          headers: { "Content-Type": "application/json" },
          status: 404,
        });
      }

      return new Response(null, {
        headers: { Location: "/login" },
        status: 303,
      });
    },
    onSuccess: (req, user) => {
      const url = new URL(req.url);
      // We pass through API requests
      if (url.pathname.startsWith("/api")) {
        return;
      }

      // If this is a request to login and the user is already logged in,
      // redirect them to user
      if (user && url.pathname.startsWith("/login")) {
        return new Response("", {
          status: 303,
          headers: { Location: "/user" },
        });
      }
    },
  });
}
