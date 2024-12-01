import { useSignal } from "@preact/signals";
import { Poll as PollType } from "../../database/query/poll.ts";
import PollsList from "./PollsList.tsx";
import Poll from "./Poll.tsx";

export type PollsProps = { polls: PollType[] };

export default function Polls({ polls }: PollsProps) {
  const selectedPoll = useSignal(polls[polls.length - 1]);
  return (
    <div>
      <PollsList polls={polls} selectedSignal={selectedPoll} />
      <Poll {...selectedPoll.value} />
    </div>
  );
}
