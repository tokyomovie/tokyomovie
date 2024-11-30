import { FreshContext, PageProps } from "$fresh/server.ts";
import { State } from "../../types/request.ts";
import Stars from "../../islands/stars/Stars.tsx";
import EventIsland from "../../islands/EventIsland/EventIsland.tsx";
import Title from "../../components/Title.tsx";
import { type Event, findEvents } from "../../database/query/event.ts";
import { Database } from "jsr:@db/sqlite@0.11";

function getData(db: Database, userId?: number) {
  return {
    events: findEvents(db, userId),
  };
}

export const handler = {
  async GET(_req: Request, ctx: FreshContext<State>) {
    return await ctx.render(getData(ctx.state.context.db, ctx.state.user?.id));
  },
};

type EventProps = {
  flash?: { message: string; type: string };
  events: Event[];
};

export default function Event(props: PageProps<EventProps>) {
  const { flash, events } = props.data || {};
  return (
    <div>
      <div>
        {flash && <p class={`p-2 text-${flash.type}`}>{flash.message}</p>}
        <div class="p-4">
          <Title level={1}>Events</Title>
        </div>
        <div>
          <EventIsland events={events} />
        </div>
      </div>
      <Stars />
    </div>
  );
}
