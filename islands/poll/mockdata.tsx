import { Poll } from "../../database/query/poll.ts";

export const POLL_MOCK_DATA = {
  id: 123,
  name: "mock poll",
  description: "this is a poll",
  active: true,
  createdAt: "created time",
  endsAt: "ends at time",
  movies: [
    { id: 123, name: "hackers", voteTotal: 3 },
    { id: 124, name: "cocktail", voteTotal: 0 },
    { id: 125, name: "my mom my mom my mom my mom", voteTotal: 1 },
  ],
} satisfies Poll;

export const INIT_POLL_DATA = {
  id: 123,
  name: "INIT-ONLY",
  description: "this is a poll",
  active: true,
  createdAt: "created time",
  endsAt: "ends at time",
  movies: [
    { id: 123, name: "hackers", voteTotal: 3 },
    { id: 124, name: "cocktail", voteTotal: 0 },
    { id: 124, name: "my mom", voteTotal: 1 },
  ],
} satisfies Poll;

export const POLL_ENTRY_MOCK = {
  id: 123,
  name: "ENTRY-MOCK",
  voteTotal: 3,
  selected: true,
  clickHandler: () => console.log("pll"),
};
