import { Handlers, PageProps } from "$fresh/server.ts";
import { createEvent, Event, findEvents } from "../../database/query/event.ts";
import { findMovies, Movie } from "../../database/query/movie.ts";
import Button from "../../islands/Button.tsx";
import { InputField, SelectField } from "../../islands/form/mod.ts";
import { z } from "zod";
import { errorsToString } from "../../utils/forms.ts";
import { Database } from "jsr:@db/sqlite@0.11";
import { State } from "../../types/request.ts";

const createEventSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  path: z.string(),
  url: z.string(),
  venue: z.string().min(1),
  venueUrl: z.string().url(),
  movieId: z.number(),
  eventStartsAt: z.string().min(1),
  eventEndsAt: z.string().min(1),
  price: z.number().nullable(),
  priceDescription: z.string().nullable(),
});

function getData(db: Database) {
  return {
    movies: findMovies(db),
    events: findEvents(db),
  };
}

export const handler: Handlers<EventsProps, State> = {
  async GET(_req, ctx) {
    return await ctx.render(getData(ctx.state.context.db));
  },
  async POST(req, ctx) {
    const { db } = ctx.state.context;

    const form = await req.formData();
    const name = form.get("name")?.toString() || "";
    const description = form.get("description")?.toString() || "";
    const path = form.get("path")?.toString() || "";
    const url = form.get("url")?.toString() || "";
    const venue = form.get("venue")?.toString() || "";
    const venueUrl = form.get("venueUrl")?.toString() || "";
    const movieId = parseInt(form.get("movieId")?.toString() || "") || 0;
    const price = parseInt(form.get("price")?.toString() || "") || null;
    const priceDescription = form.get("priceDescription")?.toString() || null;
    const eventStartsAt = form.get("eventStartsAt")?.toString() || "";
    const eventEndsAt = form.get("eventEndsAt")?.toString() || "";

    const parsed = await createEventSchema.safeParseAsync({
      name,
      description,
      path,
      url,
      movieId,
      eventStartsAt,
      eventEndsAt,
      price,
      priceDescription,
      venue,
      venueUrl,
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
      createEvent(db, data);

      return ctx.render({
        flash: {
          message: `Event successfully created`,
          type: "success",
        },
        ...getData(db),
      });
    } catch (e) {
      console.error(e);
      return ctx.render({
        flash: {
          message: `Error creating event`,
          type: "error",
        },
        ...getData(db),
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
            label="Event Description"
            type="text"
            name="description"
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
          <InputField
            label="Venue"
            placeholder="Movie Barn"
            type="text"
            name="venue"
            required
          />
          <InputField
            label="Venue URL"
            placeholder="https://movie-barn.com"
            type="text"
            name="venueUrl"
          />
          <InputField
            label="Price"
            type="number"
            name="price"
            placeholder="1000"
          />
          <InputField
            label="Price Description"
            placeholder="one drink"
            type="text"
            name="price"
          />
          <InputField
            label="Relative Path to Event"
            type="text"
            name="path"
            helperText="A path to the static event page within tokyomovie.group"
            placeholder="/existenz"
          />
          <InputField
            label="Absolute URL"
            type="text"
            name="url"
            helperText="A URL to the event page that is outside of tokyomovie.group"
            placeholder="https://some-other-site.com/my-movie"
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
          {events?.map(
            (
              { id, name, eventStartsAt, venue, eventEndsAt, attendingCount },
            ) => {
              return (
                <li>
                  {id}. {name} @{venue}, starts: {eventStartsAt}, ends:{" "}
                  {eventEndsAt}, RSVP'd: {attendingCount}
                </li>
              );
            },
          )}
        </ul>
      </div>
    </div>
  );
}
