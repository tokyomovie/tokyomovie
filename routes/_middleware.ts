import { FreshContext } from "$fresh/server.ts";
import { authMiddleware } from "../middleware/auth.ts";
import { RequestState } from "../types/request.ts";

export async function handler(
  req: Request,
  ctx: FreshContext<RequestState>,
) {
  return await authMiddleware({ req, ctx });
}
