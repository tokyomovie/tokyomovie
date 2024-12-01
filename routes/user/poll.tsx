import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "../../types/request.ts";
import { findPolls, Poll as PollType } from "../../database/query/poll.ts";
import Info from "../../components/Info.tsx";
import Title from "../../components/Title.tsx";
import Polls from "../../islands/poll/Polls.tsx";

type PollProps = {
  polls?: PollType[];
  flash?: { message: string; type: "success" | "error" };
};

export const handler: Handlers<PollProps, State> = {
  async GET(_req, ctx) {
    return await ctx.render({ polls: findPolls(ctx.state.context.db) });
  },
};

export default function Poll(props: PageProps<PollProps>) {
  const { polls, flash } = props.data;
  if (!polls) return <div>NO POLLS!</div>;

  return (
    <div>
      <div class="m-6">
        <Title level={1}>
          Polls 投票!
        </Title>
      </div>
      {flash && <Info type={flash.type} message={flash.message} />}
      <Polls polls={polls} />
    </div>
  );
}
