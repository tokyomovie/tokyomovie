import { Signal } from "@preact/signals";
import { Poll as PollType } from "../../database/query/poll.ts";
import { PollsProps } from "./Polls.tsx";
import Select from "../../components/Select.tsx";

// Signal<PollType>

export type PollsListProps = {
  selectedSignal: Signal<PollType>;
} & PollsProps;

export default function PollsList({ polls, selectedSignal }: PollsListProps) {
  const sortedPolls = polls.toReversed();
  const selectOptions = sortedPolls.map((poll) => ({
    value: `${poll.id}`,
    label: poll.name,
  }));

  return (
    <div class="mx-4 mb-10">
      <Select
        name="polls list"
        full
        options={selectOptions}
        onChange={(event) => {
          const t = event.target as HTMLSelectElement;
          const pollId = Number(t?.value);
          if (!pollId) return;
          const selectedPoll = polls.find((p) => p.id === pollId) as PollType;
          selectedSignal.value = selectedPoll;
        }}
      />
    </div>
  );
}
