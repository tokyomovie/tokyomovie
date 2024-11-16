import { FreshContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  _req: Request,
  ctx: FreshContext<State>,
) {
  const resp = await ctx.next();
  return resp;
}
