import { expect } from "@std/expect";
import {
  addUserToEvent,
  createEvent,
  deleteEvent,
  type Event,
  findEventById,
  findEvents,
  findUsersAttendingEvent,
  removeUserFromEvent,
} from "./event.ts";
import { getConnection } from "../db.ts";
import { createUser } from "./user.ts";
import { createMovie } from "./movie.ts";

Deno.test("database operations", async (t) => {
  using connection = getConnection();
  const { db } = connection;
  db.exec(`DELETE FROM users`);
  db.exec(`DELETE FROM movies`);
  db.exec(`DELETE FROM events`);
  db.exec(`DELETE FROM event_users`);

  let event: Event;
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
  const movie = createMovie(db, {
    name: "hackers",
    description: "a banger",
    url: "http://aurl.com",
    icon: "/public/my-icon.png",
  });

  await t.step("create event", () => {
    event = createEvent(db, {
      name: "foo event",
      movieId: movie.id,
      path: "/path",
      url: "https://imdb.com/path",
      eventStartsAt: new Date().toISOString(),
      eventEndsAt: new Date().toISOString(),
    });

    expect(event.id).toBeTruthy();
  });

  await t.step("find events", () => {
    expect(findEvents(db)).toHaveLength(1);
  });

  await t.step("find event with id", () => {
    const found = findEventById(db, event.id);
    expect(found).not.toBeUndefined();
    expect(found?.id).toBe(event.id);
    expect(found?.movie?.name).toEqual(movie.name);

    const eventNotExist = findEventById(db, Date.now());
    expect(eventNotExist).toBeNull();
  });

  await t.step("add user to a event", () => {
    expect(addUserToEvent(db, { eventId: event.id, userId: user1.id })).toBe(1);
    expect(addUserToEvent(db, { eventId: event.id, userId: user2.id })).toBe(1);

    const users = findUsersAttendingEvent(db, event.id);
    expect(users).toHaveLength(2);
  });

  await t.step("remove user from a event", () => {
    expect(removeUserFromEvent(db, { eventId: event.id, userId: user1.id }))
      .toBe(1);

    const users = findUsersAttendingEvent(db, event.id);
    expect(users).toHaveLength(1);
  });

  await t.step("delete event", () => {
    expect(deleteEvent(db, event.id)).toBe(1);
  });
});
