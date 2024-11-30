import { Poll } from "../../database/query/poll.ts";
export async function getPolls() {
  const response = await fetch("/api/polls", {
    method: "get",
    credentials: "include",
  });
  try {
    const { ok, data } = await response.json() as { ok: boolean; data: Poll[] };
    if (!ok) return "error getting json data";
    return data;
  } catch (e) {
    console.warn("error parsing json respon from getPolls");
    return "error getting json data";
  }
}

export async function voteForMovieInPoll(pollId: number, movieId: number) {
  const response = await fetch(`/api/polls/${pollId}/vote`, {
    method: "post",
    body: JSON.stringify({ movieId: movieId }),
    credentials: "include",
  });
  try {
    const { ok, data } = await response.json() as { ok: boolean; data: {} };
    if (!ok) {
      return "error adding vote to poll";
    }
    return "vote added to poll " + pollId;
  } catch {
    console.warn("error parsing response json add vote");
    return "error parsing response json add vote";
  }
}

export async function removeVoteFromPoll(pollId: number, movieId: number) {
  const response = await fetch(`/api/polls/${pollId}/vote`, {
    method: "delete",
    body: JSON.stringify({ movieId: movieId }),
    credentials: "include",
  });
  try {
    const { ok, data } = await response.json() as { ok: boolean; data: {} };
    if (!ok) {
      return "error removing vote from poll";
    }
    return "vote removed from poll " + pollId;
  } catch {
    console.warn("error parsing response json remove vote");
    return "error parsing response json remove vote";
  }
}
