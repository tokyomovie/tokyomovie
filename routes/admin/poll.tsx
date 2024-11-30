import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import {
  addMovieToPoll,
  createPoll,
  findPolls,
  Poll,
} from "../../database/query/poll.ts";
import { findMovies, Movie } from "../../database/query/movie.ts";
import Button from "../../islands/Button.tsx";
import { InputField, SelectField } from "../../islands/form/mod.ts";
import { z } from "zod";
import { errorsToString } from "../../utils/forms.ts";
import { Database } from "jsr:@db/sqlite@0.11";
import { State } from "../../types/request.ts";

const createPollSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  active: z.boolean(),
  endsAt: z.string().min(1),
});

function getData(db: Database) {
  return {
    movies: findMovies(db),
    polls: findPolls(db),
  };
}

async function handleCreate(
  db: Database,
  form: FormData,
  ctx: FreshContext<State, PollsProps, PollsProps>,
) {
  const name = form.get("name")?.toString() || "";
  // const movieId = parseInt(form.get("movieId")?.toString() || "") || 0;
  const description = form.get("description")?.toString() || null;
  const active = form.get("active")?.toString() === "active";
  const endsAt = form.get("endsAt")?.toString() || "";

  const parsed = await createPollSchema.safeParseAsync({
    name,
    description,
    active,
    endsAt,
  });
  if (!parsed.success) {
    return ctx.render({
      flash: {
        message: errorsToString(parsed.error.errors),
        type: "error",
      },
      ...getData(db),
    });
  }

  try {
    const { data } = parsed;
    createPoll(db, data);

    return ctx.render({
      flash: {
        message: `Poll successfully created`,
        type: "success",
      },
      ...getData(db),
    });
  } catch (e) {
    console.error(e);
    return ctx.render({
      flash: {
        message: `Error creating poll`,
        type: "error",
      },
      ...getData(db),
    });
  }
}

function handleAddMovie(
  db: Database,
  form: FormData,
  ctx: FreshContext<State, PollsProps, PollsProps>,
) {
  const pollId = parseInt(form.get("pollId")?.toString() || "") || 0;
  const movieId = parseInt(form.get("movieId")?.toString() || "") || 0;

  try {
    addMovieToPoll(db, {
      pollId,
      movieId,
    });

    return ctx.render({
      flash: {
        message: `Movie successfully added!`,
        type: "success",
      },
      ...getData(db),
    });
  } catch (e) {
    console.error(e);
    return ctx.render({
      flash: {
        message: `Error creating poll`,
        type: "error",
      },
      ...getData(db),
    });
  }
}

export const handler: Handlers<PollsProps, State> = {
  async GET(_req, ctx) {
    return await ctx.render(getData(ctx.state.context.db));
  },
  async POST(req, ctx) {
    const { db } = ctx.state.context;
    const form = await req.formData();
    const request = form.get("request")?.toString() || "";
    console.log({ request });
    if (request === "create") {
      return await handleCreate(db, form, ctx);
    }
    if (request === "add-movie") {
      return handleAddMovie(db, form, ctx);
    }

    return ctx.render({
      flash: {
        message: `Unknown request`,
        type: "error",
      },
      ...getData(db),
    });
  },
};

type PollsProps = {
  polls?: Poll[];
  movies?: Movie[];
  flash?: { message: string; type: string };
};

export default function Polls(props: PageProps<PollsProps>) {
  const { polls, movies, flash } = props.data;
  return (
    <div class="flex flex-col gap-8 p-4">
      <h1 class="text-xl font-bold">Polls Admin</h1>
      {flash && <pre class={`p-2 text-${flash.type}`}>{flash.message}</pre>}
      <form method="post" name="create">
        <div class="flex flex-col text-xs gap-4">
          <h2 class="text-lg font-bold">Create an Poll</h2>
          <input type="hidden" name="request" value="create" />
          <InputField label="Poll Name" type="text" name="name" required />
          <InputField
            label="Poll Description"
            type="text"
            name="description"
            required
          />
          <InputField
            label="Poll Active"
            type="checkbox"
            value="active"
            name="active"
            checked
            required
          />
          <InputField
            label="Event Ends At"
            type="datetime-local"
            min={new Date().toISOString()}
            name="endsAt"
            required
          />
        </div>
        <div>
          <Button type="submit">
            Create Poll
          </Button>
        </div>
      </form>

      <form method="post" name="add-movie">
        <div class="flex flex-col text-xs gap-4">
          <h2 class="text-lg font-bold">Add Movie to Poll</h2>
          <input type="hidden" name="request" value="add-movie" />

          <SelectField
            name="pollId"
            label="Poll"
            options={polls?.map((m) => ({
              value: m.id.toString(),
              label: m.name,
            })) ?? []}
            required
          />
          <SelectField
            name="movieId"
            label="Movie"
            options={movies?.map((m) => ({
              value: m.id.toString(),
              label: m.name,
            })) ?? []}
            required
          />
        </div>
        <div>
          <Button type="submit">
            Add Movie to Poll
          </Button>
        </div>
      </form>

      <div>
        <h2 class="text-xl font-bold">Polls</h2>
        <ul>
          {polls?.map(
            (
              { id, name, endsAt, movies },
            ) => {
              console.log({ movies });
              return (
                <li class="flex flex-col">
                  <span>
                    {id}. {name}, ends: {endsAt}
                  </span>
                  <span>Movies in poll</span>
                  <ul>
                    {movies?.map((m) => (
                      <li>{m.name}, vote total: {m.voteTotal}</li>
                    ))}
                  </ul>
                </li>
              );
            },
          )}
        </ul>
      </div>
    </div>
  );
}
