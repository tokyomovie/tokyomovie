import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import Title from "../../components/Title.tsx";
import Button from "../Button.tsx";

// type T = Poll['movies'][number]
// TODO: type  this out properly
export type PollEntryProps = {
  pollId: number;
  movieId: number;
  name: string;
  voteTotal: number;
  selected: boolean;
  clickHandler: Signal<PollEntryProps | null>;
};

export default function PollEntry(props: PollEntryProps) {
  const { pollId, movieId, name, voteTotal, selected, clickHandler } = props;

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
          onClick={() => {
            if (clickHandler) {
              clickHandler.value = props;
            }
          }}
        >
          こいつ!
        </Button>
      </div>
    </div>
  );
}
