import { useSignal, useSignalEffect } from "@preact/signals";
import { FreshContext, PageProps } from "$fresh/server.ts";
import { State } from "../../types/request.ts";
import { Poll as Pollq } from "../../database/query/poll.ts";
import PollEntry from "./PollEntry.tsx";
import Title from "../../components/Title.tsx";
import Button from "../../islands/Button.tsx";
import {
  INIT_POLL_DATA,
  POLL_ENTRY_MOCK,
  POLL_MOCK_DATA,
} from "./mockdata.tsx";
import Divider from "../../components/Divider.tsx";
import { PollEntryProps } from "./PollEntry.tsx";

type PollProps = {} & Pollq;

export default function Poll() {
  const pollData = useSignal<PollProps>(INIT_POLL_DATA);
  //@ts-ignore
  const selected = useSignal<PollEntryProps | null>();
  useSignalEffect(() => {
    pollData.value = POLL_MOCK_DATA;
  });
  const { id, name, description, active, createdAt, endsAt, movies } =
    pollData.value;
  function handleSelected() {}
  function handleSubmitVote() {}
  if (name === "INIT-ONLY") return null;
  return (
    <div>
      <div class="m-6">
        <Title level={1}>
          Polls 投票! What's the next movie? 次回何にしよう？
        </Title>
      </div>
      <Divider classes="mt-[110px]" />
      <div>
        {movies?.map((movie, index) => {
          const { id, name, voteTotal } = movie;
          const isSelected = id === selected?.value?.id;
          return (
            <>
              <div class="mx-4">
                <PollEntry
                  {...movie}
                  selected={isSelected}
                  clickHandler={selected}
                />
              </div>
              {index !== movies?.length - 1 && <Divider classes="mt-[30px]" />}
            </>
          );
        })}
      </div>
      <div class="mx-4 mt-[40px]">
        <Button fullWidth onClick={handleSubmitVote}>submit!</Button>
      </div>
    </div>
  );
}
