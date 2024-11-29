import { expect } from "@std/expect";
import {
  createMovie,
  deleteMovie,
  findMovieById,
  findMovieByName,
  type Movie,
} from "./movie.ts";
import { getConnection } from "../db.ts";

Deno.test("database operations", async (t) => {
  using connection = getConnection();
  const { db } = connection;
  db.exec(`DELETE FROM users`);
  db.exec(`DELETE FROM movies`);
  let movie: Movie;

  await t.step("create movie", () => {
    movie = createMovie(db, {
      name: "foo movie",
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

  await t.step("delete movie", () => {
    expect(deleteMovie(db, movie.id)).toBe(1);
  });
});
