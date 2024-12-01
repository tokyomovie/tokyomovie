import { useComputed, useSignal } from "@preact/signals";
import { Poll as PollQuery } from "../../database/query/poll.ts";
import PollEntry from "./PollEntry.tsx";
import Button from "../../islands/Button.tsx";
import Divider from "../../components/Divider.tsx";
import { PollEntryProps } from "./PollEntry.tsx";
import { voteForMovieInPoll } from "./handlers.tsx";
import Info from "../../components/Info.tsx";

type PollProps = {} & PollQuery;

export type SelectedPoll =
  | Omit<PollEntryProps, "clickHandler" | "selected">
  | null;

export default function Poll(props: PollProps) {
  const selectedPollEntry = useSignal<SelectedPoll>(null);
  const voteSubmitted = useSignal(false);
  const error = useSignal("");
  const success = useSignal(false);
  const isSuccessful = useComputed(() =>
    voteSubmitted.value && !error.value && success.value
  );

  async function handleSubmitVote() {
    if (!selectedPollEntry.value) {
      error.value = "select something please 何か選んで";
      setTimeout(() => {
        error.value = "";
      }, 2500);
    }
    if (selectedPollEntry.value) {
      const { pollId, movieId } = selectedPollEntry.value;
      const response = await voteForMovieInPoll(pollId, movieId);
      if (response.includes("error")) {
        error.value =
          "something went wrong submitting your vote, try again or just give up because this app is garbage";
        setTimeout(() => {
          error.value = "";
        }, 2500);
        return;
      }
      voteSubmitted.value = true;
      success.value = true;
      setTimeout(() => {
        location.reload();
      }, 850);
    }
  }

  // TODO: handle rest of polls data
  const { id, name, description, active, createdAt, endsAt, movies } = props;

  return (
    <div>
      <Divider classes="mt-[20px]" />
      <div>
        {movies?.map((movie, index) => {
          const isSelected = movie.id === selectedPollEntry?.value?.movieId;
          return (
            <>
              <div class="mx-4">
                <PollEntry
                  pollId={id}
                  movieId={movie.id}
                  selected={isSelected}
                  clickHandler={() => {
                    error.value = "";
                    selectedPollEntry.value = {
                      id: id,
                      pollId: id,
                      movieId: movie.id,
                      name: movie.name,
                      voteTotal: movie.voteTotal,
                    };
                  }}
                  {...movie}
                />
              </div>
              {index !== movies?.length - 1 && <Divider classes="mt-[30px]" />}
            </>
          );
        })}
      </div>
      <div class="mx-4 mt-[80px] flex flex-col gap-4 mb-12">
        {(isSuccessful.value) && (
          <Info type="success" message="vote submitted! どうもでーす" />
        )}
        {error.value && <Info type="error" message={error.value} />}
        {!voteSubmitted.value && (
          <Button fullWidth onClick={handleSubmitVote}>submit!</Button>
        )}

        <Button
          fullWidth
          inverse
          onClick={() => {
            location.reload();
          }}
        >
          refresh votes
        </Button>
      </div>
    </div>
  );
}
