import { FreshContext, Handlers } from "$fresh/server.ts";
import { findPolls } from "../../database/query/poll.ts";
import { State } from "../../types/request.ts";
import * as apiResponse from "../../utils/response/api.ts";

export const handler: Handlers<any, State> = {
  GET(req, ctx) {
    const { db } = ctx.state.context;
    const polls = findPolls(db);

    return apiResponse.success(polls);
  },
};