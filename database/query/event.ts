import { Database } from "jsr:@db/sqlite@0.11";
import { Movie } from "./movie.ts";
import { User } from "./user.ts";

export type Event = {
  id: number;
  name: string;
  movieId: number;
  path?: string;
  url?: string;
  createdAt: string;
  eventEndsAt: string;
  movie?: Movie;
};

export type EventCreate = Omit<Event, "id" | "createdAt">;

export function findEvents(db: Database, opts = {
  limit: 10,
  offset: 0,
}): Event[] {
  const stmt = db.prepare(`
    SELECT * FROM events
    LIMIT ? OFFSET ?
  `);
  const rows = stmt.all<Event>(opts.limit, opts.offset);

  return rows;
}

export function findEventById(db: Database, id: number): null | Event {
  const stmt = db.prepare(`
    SELECT * FROM events
    WHERE id = ?
    LIMIT 1
  `);
  const [event] = stmt.all<Event>(id);
  if (!event) return null;

  const stmt2 = db.prepare(`
    SELECT * FROM movies
    WHERE id = ?
    LIMIT 1
  `);
  const [movie] = stmt2.all<Event>(event.movieId);
  event.movie = movie;

  return event;
}

export function findUsersAttendingEvent(db: Database, eventId: number): User[] {
  const stmt = db.prepare(`
    SELECT users.* FROM event_users   
    INNER JOIN users ON event_users.userId = users.id
    WHERE eventId = ?
  `);

  return stmt.all<User>(eventId);
}

export function createEvent(db: Database, event: EventCreate): Event {
  const stmt = db.prepare(`
    INSERT INTO events
      (name, movieId, path, url, eventEndsAt)
    VALUES (:name, :movieId, :path, :url, :eventEndsAt)
    RETURNING *
  `);
  const [created] = stmt.all<Event>(event);

  return created;
}

export function addUserToEvent(
  db: Database,
  { userId, eventId }: {
    userId: number;
    eventId: number;
  },
): number {
  return db.exec(
    `INSERT INTO event_users
      (eventId, userId)
    VALUES (:eventId, :userId)`,
    { eventId, userId },
  );
}

export function removeUserFromEvent(
  db: Database,
  { userId, eventId }: {
    userId: number;
    eventId: number;
  },
): number {
  return db.exec(
    `DELETE FROM event_users
     WHERE eventId = :eventId
       AND userId = :userId`,
    { eventId, userId },
  );
}

export function deleteEvent(db: Database, id: number): number {
  return db.exec(
    `DELETE FROM events
    WHERE id = ?`,
    id,
  );
}
