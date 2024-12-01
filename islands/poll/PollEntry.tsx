import { Signal } from "@preact/signals";
import Title from "../../components/Title.tsx";
import Button from "../Button.tsx";
import { Poll } from "../../database/query/poll.ts";
import { SelectedPoll } from "./Poll.tsx";

type PollMovie = NonNullable<Poll["movies"]>[number];

export type PollEntryProps = {
  pollId: number;
  movieId: number;
  selected: boolean;
  clickHandler: () => void;
} & PollMovie;

export default function PollEntry(props: PollEntryProps) {
  const {
    name,
    voteTotal,
    selected,
    clickHandler,
  } = props;

  return (
    <div
      class={`${selected && "bg-success"} flex justify-between relative`}
    >
      <div class="absolute top-[-35px] right-0 rounded bg-background-low px-2">
        votes: {voteTotal}
      </div>
      <div class="w-[70%]">
        <Title level={3}>{name}</Title>
      </div>
      <div>
        <Button
          onClick={clickHandler}
        >
          こいつ!
        </Button>
      </div>
    </div>
  );
}
