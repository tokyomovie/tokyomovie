import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { State } from "../../types/request.ts";
import { findPollById, Poll as Pollq } from "../../database/query/poll.ts";
import Title from "../../components/Title.tsx";
import Button from "../../islands/Button.tsx";
import { default as PollIsland } from "../../islands/poll/Poll.tsx";

// export const handler: Handlers<PollProps, State> = {
//   async GET(_req, ctx) {
//     return await ctx.render({ poll: findPollById(ctx.state.context.db, 1) });
//   },
// };

// type PollProps = {
//   poll: Pollq | null;
//   flash?: { message: string; type: string };
// };

// export default function Poll(props: PageProps<PollProps>) {
//   const { poll, flash } = props.data;
//   if (!poll) return <>no POLLss</>;
//   const { id, name, description, active, createdAt, endsAt, movies } = poll;
//   function handleSelected() {}
//   function handleSubmitVote() {}
//   return (
//     <div>
//       <div class="m-6">
//         <Title level={1}>
//           Polls 投票! What's the next movie? 次回何にしよう？
//         </Title>
//       </div>
//       <div>
//         {movies?.map((movie) => {
//           const { id, name, voteTotal } = movie;
//           return (
//             <div>
//               <div>{name}</div>
//               <Button onClick={handleSelected}>this!こいつ!</Button>
//             </div>
//           );
//         })}
//       </div>
//       <Button onClick={handleSubmitVote}>submit!</Button>
//     </div>
//   );
// }

export default function Poll() {
  return <PollIsland />;
}
