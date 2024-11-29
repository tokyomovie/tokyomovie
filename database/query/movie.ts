import { Database } from "jsr:@db/sqlite@0.11";

export type Movie = {
  id: number;
  name: string;
  description?: string;
  url?: string;
  icon?: string;
};

export type MovieCreate = Omit<Movie, "id">;

export function findMovies(db: Database, opts = {
  limit: 10,
  offset: 0,
}): Movie[] {
  const stmt = db.prepare(`
    SELECT * FROM movies
    LIMIT ? OFFSET ?
  `);
  const rows = stmt.all<Movie>(opts.limit, opts.offset);

  return rows;
}

export function createMovie(db: Database, movie: MovieCreate): Movie {
  const stmt = db.prepare(`
    INSERT INTO movies
      (name, description, url, icon)
    VALUES (:name, :description, :url, :icon)
    RETURNING *
  `);
  const [created] = stmt.all<Movie>(movie);

  return created;
}

export function findMovieById(db: Database, id: number): null | Movie {
  const stmt = db.prepare(`
    SELECT * FROM movies
    WHERE id = ?
    LIMIT 1
  `);
  const [movie] = stmt.all<Movie>(id);

  return movie ?? null;
}

export function findMovieByName(db: Database, email: string): null | Movie {
  const stmt = db.prepare(`
    SELECT * FROM movies
    WHERE name = ?
    LIMIT 1
  `);
  const [movie] = stmt.all<Movie>(email);

  return movie ?? null;
}

export function deleteMovie(db: Database, id: number): number {
  return db.exec(
    `DELETE FROM movies
    WHERE id = ?`,
    id,
  );
}
