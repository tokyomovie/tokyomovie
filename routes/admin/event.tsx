import { Handlers, PageProps } from "$fresh/server.ts";
import { getConnection } from "../../database/db.ts";
import { createEvent, Event, findEvents } from "../../database/query/event.ts";
import { findMovies, Movie } from "../../database/query/movie.ts";
import Button from "../../islands/Button.tsx";
import { InputField, SelectField } from "../../islands/form/mod.ts";
import { z } from "zod";
import { errorsToString } from "../../utils/forms.ts";

const createEventSchema = z.object({
  name: z.string().min(1),
  path: z.string(),
  url: z.string(),
  movieId: z.number(),
  eventStartsAt: z.string().min(1),
  eventEndsAt: z.string().min(1),
});

function getData() {
  using connection = getConnection();
  return {
    movies: findMovies(connection.db),
    events: findEvents(connection.db),
  }
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render(getData());
  },
  async POST(req, ctx) {
    using connection = getConnection();

    const form = await req.formData();
    const name = form.get("name")?.toString() || "";
    const path = form.get("path")?.toString() || "";
    const url = form.get("url")?.toString() || "";
    const movieId = parseInt(form.get("movieId")?.toString() || "") || 0;
    const eventStartsAt = form.get("eventStartsAt")?.toString() || "";
    const eventEndsAt = form.get("eventEndsAt")?.toString() || "";

    const parsed = await createEventSchema.safeParseAsync({
      name,
      path,
      url,
      movieId,
      eventStartsAt,
      eventEndsAt,
    });
    if (!parsed.success) {
      return ctx.render({
        flash: {
          message: errorsToString(parsed.error.errors),
          type: "error",
        },
        ...getData(),
      });
    }

    try {
      const { data } = parsed;
      createEvent(connection.db, data);

      return ctx.render({
        flash: {
          message: `Event successfully created`,
          type: "success",
        },
        ...getData(),
      });
    } catch (e) {
      console.error(e);
      return ctx.render({
        flash: {
          message: `Error creating event`,
          type: "error",
        },
        ...getData(),
      });
    }
  },
};

type EventsProps = {
  events?: Event[];
  movies?: Movie[];
  flash?: { message: string; type: string };
};

export default function Events(props: PageProps<EventsProps>) {
  const { events, movies, flash } = props.data;
  return (
    <div class="flex flex-col gap-8 p-4">
      <h1 class="text-xl font-bold">Events Admin</h1>
      {flash && <pre class={`p-2 text-${flash.type}`}>{flash.message}</pre>}
      <form method="post">
        <div class="flex flex-col text-xs gap-4">
          <h2 class="text-lg font-bold">Create an Event</h2>
          <InputField label="Event Name" type="text" name="name" required />
          <InputField
            label="Relative Path to Event"
            type="text"
            name="path"
            helperText="A path to the static event page within tokyomovie.group"
          />
          <InputField
            label="Absolute URL"
            type="text"
            name="url"
            helperText="A URL to the event page that is outside of tokyomovie.group"
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
          <InputField
            label="Event Starts At"
            type="datetime-local"
            min={new Date().toISOString()}
            name="eventStartsAt"
            required
          />
          <InputField
            label="Event Ends At"
            type="datetime-local"
            min={new Date().toISOString()}
            name="eventEndsAt"
            required
          />
          <div>
            <Button type="submit">
              Create Event
            </Button>
          </div>
        </div>
      </form>

      <div>
        <h2 class="text-xl font-bold">Events</h2>
        <ul>
          {events?.map(({ id, name, eventStartsAt }, i) => (
            <li>
              {id}. {name} @{eventStartsAt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
