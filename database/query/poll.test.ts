import { expect } from "@std/expect";
import {
  addMovieToPoll,
  addVoteToPoll,
  createPoll,
  deletePoll,
  findPollById,
  findPolls,
  type Poll,
  removeVoteFromPoll,
} from "#/database/query/poll.ts";
import { getConnection } from "#/database/db.ts";
import { createUser } from "#/database/query/user.ts";
import { createMovie } from "#/database/query/movie.ts";

Deno.test("database operations", async (t) => {
  using connection = getConnection();
  const { db } = connection;
  db.exec(`DELETE FROM users`);
  db.exec(`DELETE FROM movies`);
  db.exec(`DELETE FROM polls`);
  db.exec(`DELETE FROM poll_movies`);

  let poll: Poll;
  const user1 = createUser(db, {
    name: "yeah",
    email: "foop@doop.com",
    role: "user",
    passwordHash: "yupper",
  });
  const user2 = createUser(db, {
    name: "oh yeah",
    email: "doop@foop.com",
    role: "user",
    passwordHash: "yupper",
  });
  const movie1 = createMovie(db, {
    name: "hackers",
    description: "a banger",
    url: "http://aurl.com",
    icon: "/public/my-icon.png",
  });
  const movie2 = createMovie(db, {
    name: "existenz",
    description: "also a banger",
    url: "http://aurl.com",
    icon: "/public/my-icon.png",
  });

  await t.step("create poll", () => {
    poll = createPoll(db, {
      name: "foo poll",
      description: "a cool poll yueahhhhh",
      active: true,
    });

    expect(poll.id).toBeTruthy();
  });

  await t.step("find polls", () => {
    expect(findPolls(db)).toHaveLength(1);
  });

  await t.step("find poll with id", () => {
    const found = findPollById(db, poll.id);
    expect(found).not.toBeUndefined();
    expect(found?.id).toBe(poll.id);
    expect(found?.movies).toHaveLength(0);

    const pollNotExist = findPollById(db, Date.now());
    expect(pollNotExist).toBeNull();
  });

  await t.step("add movies to a poll", () => {
    expect(addMovieToPoll(db, { pollId: poll.id, movieId: movie1.id })).toBe(1);
    expect(addMovieToPoll(db, { pollId: poll.id, movieId: movie2.id })).toBe(1);

    const found = findPollById(db, poll.id);
    expect(found?.movies).toHaveLength(2);
  });

  await t.step("vote for said movies in the poll", () => {
    expect(findPollById(db, poll.id)?.movies?.[0]?.voteTotal).toBe(0);
    expect(
      addVoteToPoll(db, {
        pollId: poll.id,
        movieId: movie1.id,
        userId: user1.id,
      }),
    ).toBe(1);
    expect(findPollById(db, poll.id)?.movies?.[0]?.voteTotal).toBe(1);
    expect(
      addVoteToPoll(db, {
        pollId: poll.id,
        movieId: movie1.id,
        userId: user2.id,
      }),
    ).toBe(2);
    expect(findPollById(db, poll.id)?.movies?.[1]?.voteTotal).toBe(0);
  });

  await t.step("cant vote twice", () => {
    expect(() =>
      addVoteToPoll(db, {
        pollId: poll.id,
        movieId: movie1.id,
        userId: user1.id,
      })
    ).toThrow();
    expect(findPollById(db, poll.id)?.movies?.[0]?.voteTotal).toBe(2);
  });

  await t.step("cant vote for two movies", () => {
    expect(() =>
      addVoteToPoll(db, {
        pollId: poll.id,
        movieId: movie2.id,
        userId: user1.id,
      })
    ).toThrow();
    expect(findPollById(db, poll.id)?.movies?.[1]?.voteTotal).toBe(0);
  });

  await t.step("can unvote", () => {
    removeVoteFromPoll(db, {
      pollId: poll.id,
      movieId: movie1.id,
      userId: user1.id,
    });
    expect(findPollById(db, poll.id)?.movies?.[0]?.voteTotal).toBe(1);

    expect(
      addVoteToPoll(db, {
        pollId: poll.id,
        movieId: movie2.id,
        userId: user1.id,
      }),
    ).toBe(1);
    expect(findPollById(db, poll.id)?.movies?.[1]?.voteTotal).toBe(1);
  });

  await t.step("delete poll", () => {
    expect(deletePoll(db, poll.id)).toBe(1);
  });
});
