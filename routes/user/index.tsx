import { FreshContext } from "$fresh/server.ts";
import { State } from "../../types/request.ts";

export const handler = {
  GET(_req: Request, _ctx: FreshContext<State>) {
    return new Response(null, {
      headers: { Location: "/user/event" },
      status: 303,
    });
  },
};
