import { expect } from "@std/expect";
import {
  createAttendedMovie,
  createMovie,
  deleteMovie,
  findMovieById,
  findMovieByName,
  findMoviesAttendedByUser,
  type Movie,
} from "./movie.ts";
import { getConnection } from "../db.ts";
import { createUser } from "./user.ts";

Deno.test("database operations", async (t) => {
  using connection = getConnection();
  const { db } = connection;
  db.exec(`DELETE FROM users`);
  db.exec(`DELETE FROM movies`);
  let movie: Movie;

  await t.step("create movie", () => {
    movie = createMovie(db, {
      name: "foo movie",
      year: 1984,
      description: "yeah",
      url: "http://aurl.com",
      icon: "/public/my-icon.png",
    });

    expect(movie.id).toBeTruthy();
  });

  await t.step("find movie with email", () => {
    const movie = findMovieByName(db, "foo movie");
    expect(movie).not.toBeUndefined();
    const movieNotExist = findMovieByName(db, "fffofofoof");
    expect(movieNotExist).toBeNull();
  });

  await t.step("find movie with id", () => {
    const found = findMovieById(db, movie.id);
    expect(found).not.toBeUndefined();

    const movieNotExist = findMovieById(db, Date.now());
    expect(movieNotExist).toBeNull();
  });

  const user = createUser(db, {
    name: "yeah",
    email: "foop@doop.com",
    role: "user",
    passwordHash: "yupper",
  });

  await t.step("attend movie", () => {
    const attended = createAttendedMovie(db, {
      movieId: movie.id,
      userId: user.id,
    });
    expect(attended).toBe(1);
  });

  await t.step("get attended movies", () => {
    const attended = findMoviesAttendedByUser(db, user.id);
    expect(attended).toHaveLength(1);
    expect(attended[0].name).toBe("foo movie");
  });

  await t.step("delete movie", () => {
    expect(deleteMovie(db, movie.id)).toBe(1);
  });
});
