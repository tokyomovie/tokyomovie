import { FreshContext, PageProps } from "$fresh/server.ts";
import { RequestState } from "../../types/request.ts";

export const handler = {
  GET(_req: Request, ctx: FreshContext<RequestState>) {
    return ctx.render();
  },
};

type EventProps = {
  flash?: { message: string; type: string };
};

export default function Event(props: PageProps<EventProps>) {
  const { flash } = props.data || {};
  return (
    <div class="test px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        {flash && <p class={`p-2 text-${flash.type}`}>{flash.message}</p>}
        <h1>Events</h1>
      </div>
    </div>
  );
}
