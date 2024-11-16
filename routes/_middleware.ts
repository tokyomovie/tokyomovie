import { FreshContext } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { PROTECTED_ROUTES } from "../constants/routes.ts";
import { getConnection } from "../database/db.ts";
import { findUserByEmail } from "../database/query/user.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const url = new URL(req.url);
  const isProtected = PROTECTED_ROUTES.some((route) =>
    url.pathname.startsWith(route)
  );
  const cookies = getCookies(req.headers)
  const accessToken = cookies.auth;

  const resp = await ctx.next();

  console.log({ accessToken })
    // setCookie(resp.headers, { name: 'auth', value: 'test' })
  if (isProtected && !accessToken) {
    return new Response("", {
      status: 303,
      headers: { Location: "/" },
    });
  }

  if (accessToken) {
    using connection = getConnection();
    // todo: token handling
    const user =  findUserByEmail(connection.db, "aaron.burdick@protonmail.com")

    console.log({ isProtected, user })
    if (isProtected && !user) {
      return new Response(null, { headers: resp.headers, status: 303 })
    }

    ctx.state.user = user;
  }

  return resp
}
