import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { PROTECTED_ROUTES } from "../constants/routes.ts";
import { getConnection } from "../database/db.ts";
import { findUserById } from "../database/query/user.ts";
import { State } from "../types/request.ts";
import { decodeSession } from "../utils/session.ts";

export async function authMiddleware({
  req,
  ctx,
}: {
  req: Request;
  ctx: FreshContext<State>;
}) {
  const url = new URL(req.url);
  if (url.pathname.match(/.+\.\w+$/)) {
    return await ctx.next();
  }

  const isProtected = PROTECTED_ROUTES.some((route) =>
    url.pathname.startsWith(route)
  );
  const cookies = getCookies(req.headers);
  const encodedSession = cookies.auth;

  if (isProtected && !encodedSession) {
    return new Response("", {
      status: 303,
      headers: { Location: "/login" },
    });
  }

  if (encodedSession) {
    const session = await decodeSession(
      encodedSession,
      ctx.state.context.sessionKeyAndIv,
    );

    using connection = getConnection();
    const user = findUserById(connection.db, session.userId);

    if (isProtected && !user) {
      return new Response(null, {
        headers: { Location: "/login" },
        status: 303,
      });
    }

    ctx.state.user = user;

    if (user && url.pathname.startsWith("/login")) {
      return new Response("", {
        status: 303,
        headers: { Location: "/user" },
      });
    }
  }

  return await ctx.next();
}
