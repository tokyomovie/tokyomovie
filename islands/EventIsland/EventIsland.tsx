import Card from "../../components/Card.tsx";

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

const events = sampleEventData.map((event) => (
  <Card event={event} />
));

export default function EventIsland() {
  return (
    <div>
      {events}
    </div>
  );
}
