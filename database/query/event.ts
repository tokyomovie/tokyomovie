import { Database } from "jsr:@db/sqlite@0.11";
import { Movie } from "./movie.ts";
import { User } from "./user.ts";

export type Event = {
  id: number;
  name: string;
  venue: string;
  venueUrl: string;
  path?: string;
  url?: string;
  createdAt: string;
  price: number | null;
  priceDescription: string | null;
  eventStartsAt: string;
  eventEndsAt: string;
  movie?: Movie;
  attendingCount: number;
  rsvp: "no_rsvp" | "attending" | "not_attending";
};

export type EventCreate =
  & Omit<
    Event,
    "id" | "createdAt" | "userAttending" | "attendingCount" | "rsvp"
  >
  & { movieId: number };

function rsvp(row: null | number) {
  if (row === null) return "no_rsvp";
  if (row === 0) return "not_attending";

  return "attending";
}

function rowToEvent(e: any): Event {
  return {
    id: e.id,
    name: e.name,
    venue: e.venue,
    venueUrl: e.venueUrl,
    path: e.path,
    url: e.url,
    price: e.price,
    priceDescription: e.priceDescription,
    createdAt: e.createdAt,
    eventStartsAt: e.eventStartsAt,
    eventEndsAt: e.eventEndsAt,
    movie: {
      id: e.movie_id,
      name: e.movie_name,
      description: e.movie_description,
      url: e.movie_url,
      icon: e.movie_icon,
    },
    attendingCount: e.attendingCount,
    rsvp: rsvp(e.attending),
  };
}

export function findEvents(db: Database, userId: number = 0, opts = {
  limit: 10,
  offset: 0,
}): Event[] {
  const stmt = db.prepare(`
    SELECT
      events.*,
      movies.id as movie_id,
      movies.name as movie_name,
      movies.description as movie_description,
      movies.url as movie_url,
      movies.icon as movie_icon,
      (
        SELECT count(*)
        FROM event_users
        WHERE events.id = event_users.eventId
         AND event_users.attending = 1
      ) attendingCount,
      (
        SELECT attending FROM event_users 
        WHERE events.id = event_users.eventId
          AND event_users.userId = :userId
      ) attending
    FROM events
    INNER JOIN movies ON movies.id = events.movieId
    ORDER BY eventStartsAt ASC
    LIMIT :limit OFFSET :offset
  `);
  const rows = stmt.all({
    userId,
    ...opts,
  });
  const events = rows.map(rowToEvent);

  return events;
}

export function findEventById(
  db: Database,
  id: number,
  userId: number = 0,
): null | Event {
  const stmt = db.prepare(`
    SELECT
      events.*,
      movies.id as movie_id,
      movies.name as movie_name,
      movies.description as movie_description,
      movies.url as movie_url,
      movies.icon as movie_icon,
      (
        SELECT count(*)
        FROM event_users
        WHERE events.id = event_users.eventId
          AND event_users.attending = 1
      ) attendingCount,
      (
        SELECT attending FROM event_users 
        WHERE events.id = event_users.eventId
          AND event_users.userId = :userId
      ) attending
    FROM events
    INNER JOIN movies ON movies.id = events.movieId
    WHERE events.id = :id
    LIMIT 1
  `);
  const [e] = stmt.all({ id, userId });
  if (!e) return null;

  return rowToEvent(e);
}

export function findUsersAttendingEvent(db: Database, eventId: number): User[] {
  const stmt = db.prepare(`
    SELECT users.* FROM event_users   
    INNER JOIN users ON event_users.userId = users.id
    WHERE eventId = ?
      AND event_users.attending = 1
  `);

  return stmt.all<User>(eventId);
}

export function createEvent(db: Database, event: EventCreate): Event {
  const stmt = db.prepare(`
    INSERT INTO events
      (name, movieId, venue, venueUrl, path, url, price, priceDescription, eventStartsAt, eventEndsAt)
    VALUES (:name, :movieId, :venue, :venueUrl, :path, :url, :price, :priceDescription, :eventStartsAt, :eventEndsAt)
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
      (eventId, userId, attending)
    VALUES (:eventId, :userId, 1)`,
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
    `UPDATE event_users
     SET attending = 0
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
