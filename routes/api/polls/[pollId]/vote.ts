import { Handlers } from "$fresh/server.ts";
import {
  addVoteToPoll,
  removeVoteFromPoll,
} from "../../../../database/query/poll.ts";
import { State } from "../../../../types/request.ts";
import * as apiResponse from "../../../../utils/response/api.ts";

export const handler: Handlers<{ pollId: string }, State> = {
  async POST(req, ctx) {
    const pollId = Number(ctx.params["pollId"]);
    const { db } = ctx.state.context;
    const { user } = ctx.state;
    const input = (await req.json()) as { movieId: string };
    const movieId = Number(input.movieId);
    console.log({
      pollId,
      movieId,
      userId: user?.id,
    });

    if (!pollId || !movieId || !user?.id) {
      return apiResponse.notFound();
    }

    try {
      const voteTotal = addVoteToPoll(db, {
        pollId,
        movieId,
        userId: user?.id,
      });

      return apiResponse.success({ voteTotal });
    } catch (e) {
      console.error(e);
      return apiResponse.error("unknown error occured");
    }
  },
  async DELETE(req, ctx) {
    const pollId = Number(ctx.params["pollId"]);
    const { db } = ctx.state.context;
    const { user } = ctx.state;
    const input = (await req.json()) as { movieId: string };
    const movieId = Number(input.movieId);
    console.log({
      pollId,
      movieId,
      userId: user?.id,
    });

    if (!pollId || !movieId || !user?.id) {
      return apiResponse.notFound();
    }

    try {
      const voteTotal = removeVoteFromPoll(db, {
        pollId,
        movieId,
        userId: user?.id,
      });

      return apiResponse.success({ voteTotal });
    } catch (e) {
      console.error(e);
      return apiResponse.error("unknown error occured");
    }
  },
};
