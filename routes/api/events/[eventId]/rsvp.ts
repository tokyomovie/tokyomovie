import { Handlers } from "$fresh/server.ts";
import { addUserToEvent, removeUserFromEvent } from "#/database/query/event.ts";
import { State } from "#/types/request.ts";
import * as apiResponse from "#/utils/response/api.ts";

export const handler: Handlers<{ pollId: string }, State> = {
  async POST(req, ctx) {
    const eventId = Number(ctx.params["eventId"]);
    const { db, user } = ctx.state.context;
    const input = (await req.json()) as { attending: boolean };

    if (!eventId || !user?.id) {
      return apiResponse.notFound();
    }

    try {
      if (input.attending) {
        addUserToEvent(db, {
          eventId,
          userId: user.id,
        });
      } else {
        removeUserFromEvent(db, {
          eventId,
          userId: user.id,
        });
      }

      return apiResponse.success({ result: true });
    } catch (e) {
      console.error(e);
      return apiResponse.error("unknown error occured");
    }
  },
};
