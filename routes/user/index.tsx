import { FreshContext } from "$fresh/server.ts";
import { RequestState } from "../../types/request.ts";

export const handler = {
  GET(_req: Request, _ctx: FreshContext<RequestState>) {
    return new Response(null, {
      headers: { Location: "/user/event" },
      status: 303,
    });
  },
};
