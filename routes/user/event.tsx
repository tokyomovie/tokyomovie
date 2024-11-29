import { FreshContext, PageProps } from "$fresh/server.ts";
import { RequestState } from "../../types/request.ts";
import Header from "../../components/Header.tsx";
import Stars from "../../islands/stars/Stars.tsx";
import EventIsland from "../../islands/EventIsland/EventIsland.tsx";

export const handler = {
  GET(_req: Request, ctx: FreshContext<State>) {
    return ctx.render();
  },
};

type EventProps = {
  flash?: { message: string; type: string };
};

export default function Event(props: PageProps<EventProps>) {
  const { flash } = props.data || {};
  return (
    <div class="bg-background">
      <Header />
      <div>
        {flash && <p class={`p-2 text-${flash.type}`}>{flash.message}</p>}
        <h1 class="text-3xl text-primary">Events</h1>
        <div>
          <EventIsland />
        </div>
      </div>
      <Stars />
    </div>
  );
}
