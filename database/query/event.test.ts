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
} from "#/database/query/event.ts";
import { getConnection } from "#/database/db.ts";
import { createUser } from "#/database/query/user.ts";
import { createMovie } from "#/database/query/movie.ts";

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
      description: "foo decription",
      movieId: movie.id,
      venue: "da club",
      venueUrl: "http://daclub.com",
      path: "/path",
      url: "https://imdb.com/path",
      eventStartsAt: new Date().toISOString(),
      eventEndsAt: new Date().toISOString(),
      price: 1000,
      priceDescription: "one drink",
    });

    expect(event.id).toBeTruthy();
  });

  await t.step("can create event with no price or description", () => {
    const eventNoPrice = createEvent(db, {
      name: "foo event",
      description: "foo description",
      movieId: movie.id,
      path: "/path",
      url: "https://imdb.com/path",
      venue: "da club 2",
      venueUrl: "http://daclub2.com",
      eventStartsAt: new Date().toISOString(),
      eventEndsAt: new Date().toISOString(),
      price: null,
      priceDescription: null,
    });

    expect(eventNoPrice.id).toBeTruthy();
  });

  await t.step("find events", () => {
    const events = findEvents(db, user1.id);
    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({
      name: "foo event",
      path: "/path",
      url: "https://imdb.com/path",
      price: null,
      venue: "da club 2",
      venueUrl: "http://daclub2.com",
      priceDescription: null,
      movie: expect.objectContaining({ name: "hackers" }),
      rsvp: "no_rsvp",
      attendingCount: 0,
    });
    expect(events[1]).toMatchObject({
      name: "foo event",
      path: "/path",
      url: "https://imdb.com/path",
      price: 1000,
      venue: "da club",
      venueUrl: "http://daclub.com",
      priceDescription: "one drink",
      movie: expect.objectContaining({ name: "hackers" }),
      rsvp: "no_rsvp",
      attendingCount: 0,
    });
  });

  await t.step("find event with id", () => {
    const found = findEventById(db, event.id, user1.id);
    expect(found).toMatchObject({
      name: "foo event",
      path: "/path",
      url: "https://imdb.com/path",
      price: 1000,
      priceDescription: "one drink",
      movie: expect.objectContaining({ name: "hackers" }),
      rsvp: "no_rsvp",
      attendingCount: 0,
    });

    const eventNotExist = findEventById(db, Date.now(), user1.id);
    expect(eventNotExist).toBeNull();
  });

  await t.step("add user to a event", () => {
    expect(addUserToEvent(db, { eventId: event.id, userId: user1.id })).toBe(1);
    expect(addUserToEvent(db, { eventId: event.id, userId: user2.id })).toBe(1);

    const users = findUsersAttendingEvent(db, event.id);
    expect(users).toHaveLength(2);

    const found = findEventById(db, event.id, user1.id);
    expect(found).toMatchObject({
      attendingCount: 2,
      rsvp: "attending",
    });
  });

  await t.step("remove user from a event", () => {
    expect(removeUserFromEvent(db, { eventId: event.id, userId: user1.id }))
      .toBe(1);

    const users = findUsersAttendingEvent(db, event.id);
    expect(users).toHaveLength(1);

    const found = findEventById(db, event.id, user1.id);
    expect(found).toMatchObject({
      attendingCount: 1,
      rsvp: "not_attending",
    });
    const found2 = findEventById(db, event.id, user2.id);
    expect(found2).toMatchObject({
      attendingCount: 1,
      rsvp: "attending",
    });
    const events = findEvents(db, user1.id);
    expect(events[1].id).toBe(event.id);
    expect(events[1]).toMatchObject({
      rsvp: "not_attending",
    });
    const events2 = findEvents(db, user2.id);
    expect(events2[1].id).toBe(event.id);
    expect(events2[1]).toMatchObject({
      rsvp: "attending",
    });
  });

  await t.step("delete event", () => {
    expect(deleteEvent(db, event.id)).toBe(1);
  });
});
