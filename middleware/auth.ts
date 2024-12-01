import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { PROTECTED_ROUTES } from "../constants/routes.ts";
import { findUserById, type User } from "../database/query/user.ts";
import { State } from "../types/request.ts";
import { decodeSession } from "../utils/session.ts";

export async function authMiddleware({
  req,
  ctx,
  onSuccess,
  onError,
}: {
  req: Request;
  ctx: FreshContext<State>;
  onSuccess: (req: Request, user: User) => Response | void;
  onError: (req: Request) => Response;
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
    return onError(req);
  }

  if (encodedSession) {
    const session = await decodeSession(
      encodedSession,
      ctx.state.context.sessionKeyAndIv,
    );

    const { db } = ctx.state.context;
    const user = findUserById(db, session.userId);

    if (isProtected && !user) {
      return onError(req);
    }

    ctx.state.context.user = user;

    if (onSuccess && user) {
      const resp = onSuccess(req, user);
      if (resp) return resp;
    }
  }

  return await ctx.next();
}
