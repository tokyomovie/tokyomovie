import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { PROTECTED_ROUTES } from "../constants/routes.ts";
import { getConnection } from "../database/db.ts";
import { findUserById } from "../database/query/user.ts";
import { RequestState } from "../types/request.ts";
import { decodeSession } from "../utils/session.ts";

export async function authMiddleware({
  req,
  ctx,
}: {
  req: Request;
  ctx: FreshContext<RequestState>;
}) {
  const url = new URL(req.url);
  const isProtected = PROTECTED_ROUTES.some((route) =>
    url.pathname.startsWith(route)
  );
  const cookies = getCookies(req.headers);
  const encodedSession = cookies.auth;

  const resp = await ctx.next();

  // setCookie(resp.headers, { name: 'auth', value: 'test' })
  if (isProtected && !encodedSession) {
    return new Response("", {
      status: 303,
      headers: { Location: "/" },
    });
  }

  if (encodedSession) {
    const session = await decodeSession(encodedSession);

    using connection = getConnection();
    const user = findUserById(connection.db, session.userId);

    if (isProtected && !user) {
      return new Response(null, { headers: resp.headers, status: 303 });
    }

    ctx.state.user = user;
  }

  return resp;
}