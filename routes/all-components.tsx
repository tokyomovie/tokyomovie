import FormIsland from "#/islands/FormIsland/FormIsland.tsx";
import Header from "#/islands/Header.tsx";
import { User } from "#/database/query/user.ts";
import { State } from "#/types/request.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<AllComponentsProps, State> = {
  GET(_req, ctx) {
    return ctx.render({ user: ctx.state.context.user });
  },
};

type AllComponentsProps = {
  user: User | null;
};

export default function AllComponents(props: PageProps<AllComponentsProps>) {
  return (
    <div className="flex flex-col gap-2 bg-background min-h-screen">
      <Header user={props.data.user} />
      <FormIsland />
    </div>
  );
}
