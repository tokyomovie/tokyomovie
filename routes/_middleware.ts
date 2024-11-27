import { FreshContext } from "$fresh/server.ts";
import { authMiddleware } from "../middleware/auth.ts";
import { State, Context } from "../types/request.ts";

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

  return await authMiddleware({ req, ctx });
}
