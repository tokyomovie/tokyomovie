import { FreshContext } from "$fresh/server.ts";
import { authMiddleware, jwtAuthMiddleware } from "#/middleware/auth.ts";
import { Context, State } from "#/types/request.ts";
import * as apiResponse from "#/utils/response/api.ts";
import * as serverResponse from "#/utils/response/server.ts";

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  ctx.state.context = Context.instance();

  const jwtResponse = await jwtAuthMiddleware({
    req,
    ctx,
    onError() {
      return serverResponse.notFound();
    },
    onSuccess() {
      return ctx.next();
    },
  });
  if (jwtResponse) {
    return jwtResponse;
  }

  const authResponse = await authMiddleware({
    req,
    ctx,
    onError: (req) => {
      const url = new URL(req.url);
      if (url.pathname.startsWith("/api")) {
        return apiResponse.notFound();
      }

      return serverResponse.redirect("/login");
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
        return serverResponse.redirect("/user");
      }
    },
  });
  if (authResponse) {
    return authResponse;
  }

  return await ctx.next();
}
