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
import { getPolls, voteForMovieInPoll } from "./handlers.tsx";
import Info from "../../components/Info.tsx";

type PollProps = {} & Pollq;

export default function Poll() {
  const pollData = useSignal<PollProps>(INIT_POLL_DATA);
  //@ts-ignore
  const selected = useSignal<PollEntryProps | null>();
  const voteSubmitted = useSignal(false);
  const error = useSignal("");
  const success = useSignal(false);
  useSignalEffect(() => {
    getPolls().then((polls) => {
      if (typeof polls !== "string") {
        const lastPoll = polls.at(-1);
        if (lastPoll) {
          pollData.value = lastPoll;
        }
      }
    });
  });
  const { id, name, description, active, createdAt, endsAt, movies } =
    pollData.value;
  function handleSubmitVote() {
    if (selected.value?.pollId) {
      voteForMovieInPoll(selected.value?.pollId, selected.value?.movieId).then(
        (resp) => {
          if (resp.includes("error")) {
            error.value =
              "something went wrong submitting your vote, try again";
            setTimeout(() => {
              error.value = "";
            }, 2500);
            return;
          }
          voteSubmitted.value = true;
          success.value = true;
          setTimeout(() => {
            success.value = false;
          }, 2500);
        },
      );
    }
  }
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
          const { name, voteTotal } = movie;
          const isSelected = movie.id === selected?.value?.movieId;
          return (
            <>
              <div class="mx-4">
                <PollEntry
                  pollId={id}
                  movieId={movie.id}
                  selected={isSelected}
                  clickHandler={selected}
                  {...movie}
                />
              </div>
              {index !== movies?.length - 1 && <Divider classes="mt-[30px]" />}
            </>
          );
        })}
      </div>
      <div class="mx-4 mt-[80px] flex flex-col gap-4 mb-12">
        {!voteSubmitted.value && (
          <Button fullWidth onClick={handleSubmitVote}>submit!</Button>
        )}
        {(voteSubmitted.value && !error.value) && (
          <Info type="success" message="vote submitted! どうもでーす" />
        )}
        {error.value && <Info type="error" message={error.value} />}
        {
          <Button
            fullWidth
            inverse
            onClick={() => {
              getPolls().then((polls) => {
                if (typeof polls !== "string") {
                  const lastPoll = polls.at(-1);
                  if (lastPoll) {
                    pollData.value = lastPoll;
                  }
                }
              });
            }}
          >
            refresh votes
          </Button>
        }
      </div>
    </div>
  );
}
