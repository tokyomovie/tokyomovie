import { Handlers, PageProps } from "$fresh/server.ts";
import { createMovie, findMovies, Movie } from "#/database/query/movie.ts";
import Button from "#/islands/Button.tsx";
import { InputField } from "#/islands/form/mod.ts";
import { z } from "zod";
import { errorsToString } from "#/utils/forms.ts";
import { State } from "#/types/request.ts";
import RowItem from "#/components/admin/RowItem.tsx";

const createMovieSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  url: z.string(),
  icon: z.string(),
  releaseYear: z.number(),
});

export const handler: Handlers<MoviesProps, State> = {
  async GET(_req, ctx) {
    return await ctx.render({ movies: findMovies(ctx.state.context.db) });
  },
  async POST(req, ctx) {
    const { db } = ctx.state.context;

    const form = await req.formData();
    const name = form.get("name")?.toString() || "";
    const description = form.get("description")?.toString() || "";
    const url = form.get("url")?.toString() || "";
    const icon = form.get("icon")?.toString() || "";
    const releaseYear = parseInt(form.get("releaseYear")?.toString() || "") ||
      null;

    const parsed = await createMovieSchema.safeParseAsync({
      name,
      description,
      url,
      icon,
      releaseYear,
    });
    if (!parsed.success) {
      return ctx.render({
        flash: {
          message: errorsToString(parsed.error.errors),
          type: "error",
        },
        movies: findMovies(db),
      });
    }

    try {
      const { data } = parsed;
      createMovie(db, data);

      return ctx.render({
        flash: {
          message: `Movie successfully created`,
          type: "success",
        },
        movies: findMovies(db),
      });
    } catch (e) {
      console.error(e);
      return ctx.render({
        flash: {
          message: `Error creating movie`,
          type: "error",
        },
        movies: findMovies(db),
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
      {flash && <pre class={`p-2 text-${flash.type}`}>{flash.message}</pre>}
      <form method="post">
        <div class="flex flex-col text-xs gap-4">
          <h2 class="text-lg font-bold">Create an Movie</h2>
          <InputField label="Name" type="text" name="name" required />
          <InputField label="Description" type="text" name="description" />
          <InputField
            label="URL"
            type="text"
            name="url"
            helperText="A link to a movie page"
          />
          <InputField
            label="Icon"
            type="text"
            name="icon"
            helperText="A static path to an icon"
          />
          <InputField
            label="Release Year"
            type="number"
            name="releaseYear"
            placeholder="1000"
          />
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
          {movies?.map(({ id, name }) => (
            <RowItem>
              {id}. {name}
            </RowItem>
          ))}
        </ul>
      </div>
    </div>
  );
}
