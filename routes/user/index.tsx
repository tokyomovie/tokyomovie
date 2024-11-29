import { FreshContext } from "$fresh/server.ts";
import { State } from "../../types/request.ts";
import * as serverResponse from "../../utils/response/server.ts";

export const handler = {
  GET(_req: Request, _ctx: FreshContext<State>) {
    return serverResponse.redirect("/user/event");
  },
};
