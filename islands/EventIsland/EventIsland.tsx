import Card from "../../components/Card.tsx";
import { type Event as EventType } from "../../database/query/event.ts";
import Event from "../event/Event.tsx";

const sampleEventData = [
  {
    eventTitle: "Cyberdelia",
    movieTitle: "Hackers",
    releaseYear: 1995,
    synopsis:
      "Dade, a tech genius, is banned from using a computer till he turns eighteen, after he is deemed responsible for writing a virus. When he turns eighteen however, he decides to create another virus.",
    eventDescription: "HACK THE PLANET!!!!",
    date: "1/1/2025",
    time: "8PM-10PM",
    location: "Cinema Nuovocento",
    price: "¥1000",
    rsvp: true,
    going: true,
    seatsLeft: 20,
  },
  {
    movieTitle: "eXistenz",
    releaseYear: 1999,
    synopsis:
      "In the near future, people start to magnify game designers for what they create, as superstars and players can organically enter inside the games.",
    eventDescription: "jack in to jack off with this killer thriller",
    date: "2/1/2025",
    time: "8PM-10PM",
    location: "Cinema Nuovocento",
    price: "¥1000",
    rsvp: false,
    going: false,
    seatsLeft: 12,
  },
  {
    movieTitle: "We're Back",
    releaseYear: 1993,
    synopsis:
      "A scientist travels back in time and feeds the dinosaurs with 'Brain Gain' cereal which makes them smart and peaceful and he hopes that the children from present time witness these beasts.",
    eventDescription: '"5 bags of popcorn" - Coffrin',
    date: "2/1/2025",
    time: "8PM-10PM",
    location: "Cinema Nuovocento",
    price: "¥1000",
    rsvp: true,
    going: false,
    seatsLeft: 0,
  },
];

export default function EventIsland(props: { events: EventType[] }) {
  const { events } = props;

  return (
    <div>
      {events.map((event) => (
        <Card>
          <Event
            eventId={event.id}
            eventTitle={event.name}
            movieTitle={event.movie?.name || ""}
            releaseYear={2000}
            synopsis={event.movie?.description || ""}
            eventDescription={event.description}
            date={event.eventStartsAt}
            time={event.eventStartsAt}
            location={event.venue}
            price={event.price ? event.price.toString() : ""}
            priceDescription={event.priceDescription}
            rsvp={event.rsvp}
            // TODO: add attendance limit for venue, lol
            seatsLeft={28 - event.attendingCount}
            promoUrl={event.path || event.url}
            iconPath={event.movie?.icon}
          />
        </Card>
      ))}
    </div>
  );
}
