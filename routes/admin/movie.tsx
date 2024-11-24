import { Handlers, PageProps } from "$fresh/server.ts";
import { getConnection } from "../../database/db.ts";
import { createMovie, findMovies, Movie } from "../../database/query/movie.ts";
import Button from "../../islands/Button.tsx";
import { InputField } from "../../islands/form/mod.ts";
import { z } from "zod";

const createMovieSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  url: z.string(),
  icon: z.string(),
});

export const handler: Handlers = {
  async GET(_req, ctx) {
    using connection = getConnection();
    const movies = findMovies(connection.db);
    return await ctx.render({ movies });
  },
  async POST(req, ctx) {
    using connection = getConnection();

    const form = await req.formData();
    const name = form.get("name")?.toString() || "";
    const description = form.get("description")?.toString() || "";
    const url = form.get("url")?.toString() || "";
    const icon = form.get("icon")?.toString() || "";

    const parsed = await createMovieSchema.safeParseAsync({
      name,
      description,
      url,
      icon
    });
    if (!parsed.success) {
      return ctx.render({
        flash: {
          message: parsed.error.toString(),
          type: "error",
        },
      });
    }

    try {
      const { data } = parsed;
      createMovie(connection.db, data);
      const movies = findMovies(connection.db);

      return ctx.render({
        flash: {
          message: `Movie successfully created`,
          type: "success",
        },
        movies,
      });
    } catch (e) {
      console.error(e);
      return ctx.render({
        flash: {
          message: `Error creating movie`,
          type: "error",
        },
      });
    }
  },
};

type MoviesProps = {
  movies?: Movie[];
  flash?: { message: string; type: string };
};

export default function Movies(props: PageProps<MoviesProps>) {
  const { movies, flash } = props.data;
  return (
    <div class="flex flex-col gap-8 p-4">
      <h1 class="text-xl font-bold">Movies Admin</h1>
      {flash && <p class={`p-2 text-${flash.type}`}>{flash.message}</p>}
      <form method="post">
        <div class="flex flex-col text-xs gap-4">
          <h2 class="text-lg font-bold">Create an Movie</h2>
          <InputField label="Name" type="text" name="name" required />
          <InputField label="Description" type="text" name="description" />
          <InputField label="URL" type="text" name="url" helperText="A link to a movie page" />
          <InputField label="Icon" type="text" name="icon" helperText="A static path to an icon" />
          <div>
            <Button type="submit">
              Create Movie
            </Button>
          </div>
        </div>
      </form>

      <div>
        <h2 class="text-xl font-bold">Movies</h2>
        <ul>
          {movies?.map(({ name }, i) => (
            <li>
              {i}. {name} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
