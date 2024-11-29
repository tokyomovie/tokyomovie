import { FreshContext, PageProps } from "$fresh/server.ts";
import { State } from "../../types/request.ts";
import Stars from "../../islands/stars/Stars.tsx";
import MovieIsland from "../../islands/MovieIsland/MovieIsland.tsx";
import Title from "../../components/Title.tsx";

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
    <div>
      <div>
        {flash && <p class={`p-2 text-${flash.type}`}>{flash.message}</p>}
        <div class="p-6">
          <Title level={1}>Movie Candidates</Title>
        </div>
        <div>
          <MovieIsland />
        </div>
      </div>
      <Stars />
    </div>
  );
}
