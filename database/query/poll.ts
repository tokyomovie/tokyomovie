import { Database } from "jsr:@db/sqlite@0.11";

export type PollRecord = {
  id: number;
  name: string;
  description: string;
  active: number;
  createdAt: string;
  endsAt?: string;
};

export type Poll = {
  id: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  endsAt?: string;
  movies?: {
    id: number;
    name: string;
    voteTotal: number;
  }[];
};

export type PollCreate =
  & Omit<PollRecord, "id" | "createdAt" | "endsAt" | "active">
  & { active: boolean };

function transform(record: PollRecord): Poll {
  return { ...record, active: record.active === 1 };
}

export function findPolls(db: Database, opts = {
  limit: 10,
  offset: 0,
}): Poll[] {
  const stmt = db.prepare(`
    SELECT * FROM polls
    LIMIT ? OFFSET ?
  `);
  const rows = stmt.all<PollRecord>(opts.limit, opts.offset)
    .map(transform);

  // TODO: BAD NO DONT DO THIS
  rows.map((row) => {
    const stmt2 = db.prepare(`
      SELECT movies.id, movies.name, poll_movies.voteTotal FROM poll_movies
      INNER JOIN movies ON poll_movies.movieId = movies.id
      WHERE pollId = ?
    `);
    const movies = stmt2.all<Required<Poll>["movies"][0]>(row.id);
    row.movies = movies;
  });

  return rows;
}

export function findPollById(db: Database, id: number): null | Poll {
  const stmt = db.prepare(`
    SELECT * FROM polls
    WHERE id = ?
    LIMIT 1
  `);
  const [poll] = stmt.all<PollRecord>(id).map(transform);
  if (!poll) return null;
  const stmt2 = db.prepare(`
    SELECT movies.id, movies.name, poll_movies.voteTotal FROM poll_movies
    INNER JOIN movies ON poll_movies.movieId = movies.id
    WHERE pollId = ?
  `);
  const movies = stmt2.all<Required<Poll>["movies"][0]>(id);
  poll.movies = movies;

  return poll;
}

export function createPoll(db: Database, poll: PollCreate): Poll {
  const stmt = db.prepare(`
    INSERT INTO polls
      (name, description, active, endsAt)
    VALUES (:name, :description, :active, :endsAt)
    RETURNING *
  `);
  const [created] = stmt.all<PollRecord>({
    ...poll,
    active: poll.active ? 1 : 0,
  });

  return transform(created);
}

export function addMovieToPoll(
  db: Database,
  ids: { pollId: number; movieId: number },
): number {
  return db.exec(
    `INSERT INTO poll_movies
      (pollId, movieId)
    VALUES (:pollId, :movieId)`,
    ids,
  );
}

/**
 * @return {number} voteTotal
 */
export function addVoteToPoll(
  db: Database,
  { pollId, movieId, userId }: {
    pollId: number;
    movieId: number;
    userId: number;
  },
): number | null {
  let voteTotal = null;
  const transaction = db.transaction(() => {
    db.exec(
      `INSERT INTO poll_users
        (pollId, userId)
      VALUES (:pollId, :userId)`,
      { pollId, userId },
    );

    const stmt = db.prepare(
      `UPDATE poll_movies
       SET voteTotal = voteTotal + 1
       WHERE pollId = :pollId
         AND movieId = :movieId
       RETURNING voteTotal`,
    );
    const [row] = stmt.all<{ voteTotal: number }>({ pollId, movieId });

    voteTotal = row.voteTotal;
  });
  transaction();

  return voteTotal;
}

/**
 * @return {number} voteTotal
 */
export function removeVoteFromPoll(
  db: Database,
  { pollId, movieId, userId }: {
    pollId: number;
    movieId: number;
    userId: number;
  },
): number | null {
  let voteTotal = null;
  const transaction = db.transaction(() => {
    db.exec(
      `DELETE FROM poll_users
      WHERE pollId = :pollId AND userId = :userId`,
      { pollId, userId },
    );

    const stmt = db.prepare(
      `UPDATE poll_movies
       SET voteTotal = voteTotal - 1
       WHERE pollId = :pollId
         AND movieId = :movieId
       RETURNING voteTotal`,
    );
    const [row] = stmt.all<{ voteTotal: number }>({ pollId, movieId });

    voteTotal = row.voteTotal;
  });

  transaction();

  return voteTotal;
}

export function deletePoll(db: Database, id: number): number {
  return db.exec(
    `DELETE FROM polls
    WHERE id = ?`,
    id,
  );
}
