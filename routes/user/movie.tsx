import { FreshContext, PageProps } from "$fresh/server.ts";
import { State } from "../../types/request.ts";
import Header from "../../components/Header.tsx";
import Stars from "../../islands/stars/Stars.tsx";
import MovieIsland from "../../islands/MovieIsland/MovieIsland.tsx";

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
        <h1 class="text-3xl text-primary">Movie Candidates</h1>
        <div>
          <MovieIsland />
        </div>
      </div>
      <Stars />
    </div>
  );
}
